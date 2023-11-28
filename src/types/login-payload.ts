export interface LoginPayload {
  username: string
  email: string
  password: string
}
interface Role {
  id: number
}


interface Account {
  email: string;
  password: string;
  name: string;
  address: string;
  phoneNumber: string;
  img: string;
  role: Role;
}



export interface BlogPayload {
  id: number;
  likes: number;
  avatar: string;
  content: string;
  description: string;
  image: string;
  timeCreate: string;
  timeEdit: string;
  title: string;
  tag: Tag;
  account: Account;
}



export interface RegisterPayload {
  email: string
  password: string
  name: string
  address: string
  phoneNumber: string
  img: string
  role: Role
}

export interface tagPayload{

  id:number
  name:string
}



interface Tag {
  id: number;
  name: string;
}

