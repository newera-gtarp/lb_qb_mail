local QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("nerp:qb-mail:getMail", function(_, cb)
	TriggerServerEvent("nerp:qb-mail:getMail")
	RegisterNetEvent("nerp:qb-mail:sendMail", function(emails)
		cb({ status = "ok", data = emails })
	end)
end)

RegisterNUICallback("nerp:qb-mail:updateRead", function(id, cb)
	TriggerServerEvent("nerp:qb-mail:updateRead", id)
	cb({})
end)

RegisterNUICallback("nerp:qb-mail:deleteMail", function(id, cb)
	TriggerServerEvent("nerp:qb-mail:deleteMail", id)
	cb({ status = "ok" })
end)

RegisterNUICallback("nerp:qb-mail:buttonPressed", function(button, cb)
	if button and button.enabled then
		TriggerEvent(button.buttonEvent, button.buttonData)
	end
	cb({ status = "ok" })
end)

RegisterNetEvent('nerp:qb-mail:newMail', function(email)
	exports["lb-phone"].SendCustomAppMessage('qb-mail', { type = "nerp:qb-mail:newMail", payload = { email } });
	exports["lb-phone"]:SendNotification({
		app = "qb-mail",
		title = email.sender,
		content = email.subject
	})
end)

CreateThread(function()
	while GetResourceState("lb-phone") ~= "started" do
		Wait(0)
	end

	exports["lb-phone"]:RemoveCustomApp("qb-mail")

	exports["lb-phone"]:AddCustomApp({
		identifier = "qb-mail",
		name = "Mail",
		description = "Check your important mail on the go!",
		developer = "EyeFind",
		defaultApp = true,
		size = 10000, -- kb
		-- images = { "https://example.com/photo.jpg" }, -- OPTIONAL array of images for the app on the app store
		ui = GetCurrentResourceName() .. "/web/dist/index.html",
		icon = "https://cfx-nui-" .. GetCurrentResourceName() .. "/web/dist/app-icon.png",
	})
end)
