export class RoleModel {
    public RoleId : number;
    public RoleName: string;
    public Status: boolean;
}

export class AssignRemoveModel {
    public UserId: number;
    public RoleId: number;
}

export class AssignRolesViewModel {
    public UserId: number;
    public RoleId: number;
    public UserName: string;
    public RoleName: string;
    public UserRolesId: number;
}
