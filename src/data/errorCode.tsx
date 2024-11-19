import i18n from "~/i18n"
export const NO_INFO = "**NO_INFO**";
export type Error = {
    NO_INTERNET_CONNECTION: string,
    NO_CAMERA_PERMISSION: string,
    NO_GARLLERY_PERMISSION: string,
    NO_CAMERA_DEVICE_FOUND: string,
    SOME_THING_WENT_WRONG: string,
    AI_SERVER_DOWN: string,
    AI_IMAGE_CANNOT_TRANSLATE: string,
    IMAGE_CONVERT_FAILER:string,
}

export const ERROR_MSG:Error = {
    NO_INTERNET_CONNECTION: i18n.t("No internet connection. Please check your connection and try again."),
    NO_CAMERA_PERMISSION: i18n.t("Camera permission denied. Please go to settings and enable camera permission."),
    NO_GARLLERY_PERMISSION: i18n.t("Gallery permission denied. Please go to settings and enable gallery permission."),
    NO_CAMERA_DEVICE_FOUND: i18n.t("No camera device found. Please check your camera and try again."),
    SOME_THING_WENT_WRONG: i18n.t("Something went wrong. Please try again later!"),
    AI_SERVER_DOWN: i18n.t("AI server is down. Please try again later!"),
    AI_IMAGE_CANNOT_TRANSLATE: i18n.t("Image cannot be translated. Please try another image!"),
    IMAGE_CONVERT_FAILER: i18n.t("Image convert failed. Please try again later!"),
}