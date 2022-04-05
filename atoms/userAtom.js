import { atom } from "recoil";

// State que l'on partage dans plusieurs pages pour savoir si l'utilisateur est en mode invité ou il est co avec spotify;.
export const userState = atom ({
    key: "userState",
    default: null,
});

export const imageState = atom({
    key: "imageState",
    default: "",
});

export const userNameState = atom({
    key: "userNameState",
    default: "",
})

export const infoHasChanged = atom({
    key: "infoHasChanged",
    default: false,
})