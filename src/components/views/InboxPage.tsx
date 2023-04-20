import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import React from "react";
import { useHistory } from "react-router-dom";
import { useEmails } from "../../atoms/email-atoms";
import fetchNui from "../../utils/fetchNui";

export const InboxPage: React.FC = () => {
  const [emails, setEmails] = useEmails();
  const sorted = [...emails].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const history = useHistory();

  const openEmail = (emailId: number) => {
    history.push(`/${emailId}`);
  };

  return (
    <>
      <List style={{ paddingBottom: "40px" }}>
        {sorted.map((email) => {
          return (
            <ListItem
              key={email.id}
              divider
              disablePadding
              onClick={() => {
                if (!email.read_at) {
                  fetchNui<void, number>("nerp:qb-mail:updateRead", email.id);
                  setEmails((old) => {
                    const filtered = old.filter((e) => e.id !== email.id);
                    return [
                      ...filtered,
                      {
                        ...email,
                        read_at: new Date(),
                      },
                    ];
                  });
                }
                openEmail(email.id);
              }}
            >
              <ListItemButton>
                <ListItemText
                  primary={email.sender}
                  secondary={email.subject}
                  primaryTypographyProps={{
                    style: {
                      color: "white",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  }}
                  secondaryTypographyProps={{
                    style: {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
                {!email.read_at && (
                  <ListItemIcon>
                    <CircleIcon htmlColor="#00ceff" fontSize="small" />
                  </ListItemIcon>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
