import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { QueryError } from "mysql2";

export function throwDBError(error: QueryError) {
  let dbError = error as QueryError;
  throw new Error(
    `DB error,code: ${dbError.code},
         message: ${dbError.message === "" || dbError.message === undefined ? "---" : dbError.message}, 
         cause: ${dbError.cause === "" || dbError.cause === undefined ? "---" : dbError.cause}`,
  );
}

export type SocialMedia =
  | "facebook"
  | "twitter"
  | "instagram"
  | "github"
  | "linkedin"
  | "youtube";

export const getSocialMediaIcon = (size: number, media: string) => {
  switch (media as SocialMedia) {
    case "facebook":
      return <Facebook size={size} />;
    case "github":
      return <Github size={size} />;
    case "instagram":
      return <Instagram size={size} />;
    case "twitter":
      return <Twitter size={size} />;
    case "linkedin":
      return <Linkedin size={size} />;
    case "youtube":
      return <Youtube size={size} />;
    default:
      return <Globe size={size} />;
  }
};
