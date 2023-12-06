import crypto from "crypto";

const MY_SECRET = "RIDWAN'S-EXPRESS-APP-SECRET";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(MY_SECRET)
    .digest("hex");
};
