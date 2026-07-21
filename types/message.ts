export interface Message {
    id: string;
    message: string;
    createdAt: string;

    user: {
        id: string;

        userdetails: {
            name: string;
            profilephoto: string | null;
        } | null;
    };
}