import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private users: Array<IUser> = [
    {
    id: 0,
    name: "Admin",
    email: "admin@gmail.com",
    password: "123"
  },
  {
    id: 1,
    name: "Sofia",
    email: "sabatsofia123@gmail.com",
    password: "1234"
  }
];
  private posts: Array<IPost> =[
    {
    id: 0,
    postedBy: this.users[0].name,
    topic: 'First post',
    date: new Date(2023,10,12,12,12,12).toLocaleString(),
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus atque aperiam ipsam placeat quisquam sunt ullam qui ipsum necessitatibus dolores!",
  }
];
  public getPosts(): Array<IPost>{
    return this.posts;
  }
  public setPost(post: IPost): void{
     this.posts.push(post);
  }
  public getUsers(): Array <IUser>{
    return this.users;
  }
  public setUsers(user: IUser):void{
    this.users.push(user);
  }
  constructor() { }
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}
export interface IPost{
  id: number;
  postedBy: string;
  topic: string;
  date: string;
  message: string;
}