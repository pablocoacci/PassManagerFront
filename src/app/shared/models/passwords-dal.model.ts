import { PageParams, SortParams } from "./datatable.models";

export interface PasswordsListReq {
    PageParams: PageParams,
    SortParams: SortParams,
    SearchValue: string
}

export interface PasswordDetail {
    passwordSiteId: number,
    nameSite: string,
    urlSite: string,
    descriptionSite: string,
    userNameSite: string,
    password: string
    secretAnswer: string
}