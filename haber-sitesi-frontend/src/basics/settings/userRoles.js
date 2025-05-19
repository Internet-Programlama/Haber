export const USER_ROLES = {
    GUEST: 'guest',
    MEMBER: 'member',
    EDITOR: 'editor',
    ADMIN: 'admin'
};

export const ROLE_PERMISSIONS = {
    [USER_ROLES.GUEST]: {
        canViewContent: true,
        canSearch: true
    },
    [USER_ROLES.MEMBER]: {
        canViewContent: true,
        canSaveArticles: true,
        canComment: true
    },
    [USER_ROLES.EDITOR]: {
        canCreateContent: true,
        canEditContent: true,
        canPublishContent: true
    },
    [USER_ROLES.ADMIN]: {
        canManageUsers: true,
        canManageContent: true,
        canConfigureSystem: true
    }
};