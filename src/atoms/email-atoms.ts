import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Email } from "../types/mail";
import { MockEmails } from "../utils/constants";
import { buildRespObj, isEnvBrowser } from "../utils/misc";
import fetchNui from "../utils/fetchNui";
import { ServerPromiseResp } from "../types/common";

export const emailState = atom<Email[]>({
  key: "emails",
  default: selector({
    key: "emailsDefault",
    get: async () => {
      try {
        const resp = await fetchNui<ServerPromiseResp<Email[]>>(
          "nerp:qb-mail:getMail",
          null,
          buildRespObj(MockEmails)
        );
        return (
          resp.data?.map((e) => ({
            ...e,
            created_at: new Date(e.created_at),
            deleted_at: e.deleted_at ? new Date(e.deleted_at) : undefined,
            read_at: e.read_at ? new Date(e.read_at) : undefined,
          })) ?? []
        );
      } catch (e) {
        if (isEnvBrowser()) return MockEmails;
        console.error(e);
        return [];
      }
    },
  }),
});

export const useSetEmails = () => useSetRecoilState(emailState);
export const useEmails = () => useRecoilState(emailState);
export const useEmailsValue = () => useRecoilValue(emailState);
