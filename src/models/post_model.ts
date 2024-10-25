

export interface Post{
    postId : string,
    pTitle : string,
    pDescription : string,
    pImage : string,
    createAt : string,
    creatorId : string,
    favorite : boolean,
    link : {
        link1: string,
        link2: string
    },
    like: number,

}