local QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent("nerp:qb-mail:getMail", function()
	local src = source
	local Player  = QBCore.Functions.GetPlayer(src)

	local emails = MySQL.query.await([[
		SELECT * 
		FROM player_mails 
		WHERE citizenid = ? AND deleted_at is not null
		ORDER BY created_at DESC
	]], { Player.PlayerData.citizenid })

	for index, _ in pairs(emails) do
		if emails[index].button ~= nil then
			emails[index].button = json.decode(emails[index].button)
		end
	end

	TriggerClientEvent('nerp:qb-mail:sendMail', src, emails)
end)

RegisterNetEvent('nerp:qb-mail:updateRead', function(id)
	local src = source
    local Player = QBCore.Functions.GetPlayer(src)
	MySQL.update([[
		UPDATE player_mails 
		SET `read_at` = current_timestamp()
		WHERE id = ? 
		AND citizenid = ?
	]], 
	{id, Player.PlayerData.citizenid})
end)

RegisterNetEvent('nerp:qb-mail:deleteMail', function(id)
	local src = source
    local Player = QBCore.Functions.GetPlayer(src)
	MySQL.update([[
		UPDATE player_mails 
		SET `deleted_at` = current_timestamp()
		WHERE id = ? 
		AND citizenid = ?
	]], 
	{id, Player.PlayerData.citizenid})	
end)

local function dateNow()
	return os.time() * 1000
end

local function sendEmail(citizenid, mailData)
		local id = MySQL.insert.await([[
			INSERT INTO 
				player_mails (
					`citizenid`, 
					`sender`, 
					`subject`, 
					`message`, 
					`button`
				) 
			VALUES (?, ?, ?, ?, ?)
		]], {
			citizenid, 
			mailData.sender, 
			mailData.subject, 
			mailData.message, 
			mailData.button and json.encode(mailData.button) or nil
	})

	local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
	if Player ~= nil then
		TriggerClientEvent('nerp:qb-mail:newMail', Player.PlayerData.source, {
			id = id,
			citizenid = citizenid,
			sender = mailData.sender,
			subject = mailData.subject,
			message = mailData.message,
			button = mailData.button,
			read_at = nil,
			deleted_at = nil,
			created_at = dateNow()
		})
	end
end

RegisterNetEvent('qb-phone:server:sendNewMailToOffline')
AddEventHandler('qb-phone:server:sendNewMailToOffline', function(citizenId, emailData)
    sendEmail(citizenId, emailData)
end)

RegisterServerEvent('qb-phone:server:sendNewMail')
AddEventHandler('qb-phone:server:sendNewMail', function(emailData)
    local src = source
	local Player = QBCore.Functions.GetPlayer(src)
    sendEmail(Player.PlayerData.citizenid, emailData)
end)