import { atom } from "recoil"

// State que l'on partage dans plusieurs pages pour savoir si l'utilisateur est en mode invité ou il est co avec spotify;.
export const userState = atom ({
    key: "userState",
    default: null,
})