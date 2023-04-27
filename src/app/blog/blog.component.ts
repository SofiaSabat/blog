import { Component } from '@angular/core';
import { BlogService, IPost, IUser } from '../shared/revices/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent { 
 public isLogged= false;
 public isSigningIn = false;
 public isAddingPost = false;
 public isSigningUp = false;
 public emailSignUp!: string;
 public emailSignIn!: string;
 public passwordSignIn!: string;
 public passwordSignUp!: string;
 public userName!: string;
 public error= false;
 public name = "";
 public titlePost= '';
 public textPost= '';
 public id!: number;
 public isEditPost = false;
 public posts: IPost[] = [];
 public users: IUser[] =[];
 constructor(
   private blogService:BlogService){}
   ngOnInit(): void {
    this.posts = this.blogService.getPosts(); 
    this.users = this.blogService.getUsers();
   }
   public addPost():void{
    this.resetForm();
    this.isAddingPost = true;
   }
   public closeModal():void{
   this.isAddingPost = false;  
   this.isSigningIn = false;
   this.isSigningUp = false; 
   }
   public postPost():void{
    let newPost:IPost = {
      id: 1,
      postedBy: this.name,
      topic: this.titlePost,
      date: new Date().toLocaleString(),
      message: this.textPost
    }
    if (this.posts.length > 0 ){
      const id = this.posts.slice(-1)[0].id;
      newPost.id = id + 1;
    }
    
    this.blogService.setPost(newPost);
    this.resetForm();
    this.isAddingPost = false;      
   }
   public resetForm(): void {
    this.textPost = '';
    this.titlePost = '';
  }
  // ****************************************** SIGN UP / OUT 
  public openSignUp():void {
    this.isSigningUp = true;
  }
   public submitSignUp():void {
      let user: IUser = {
        id: 1,
        name: this.userName,
        email: this.emailSignUp,
        password: this.passwordSignUp
      }
      if (this.users.length > 0 ){
        const id = this.users.slice(-1)[0].id;
        user.id = id + 1;
      }
      this.blogService.setUsers(user);
      this.isSigningUp = false;
      this.isLogged= true;
      this.name = this.userName;      
   }
   public signOut(): void {
    this.isLogged= false;
    this.id = -1;
    this.name = "";
   }
  // ****************************************** SIGN IN 
  public openSignIn():void {
    this.isSigningIn = true;
    this.error = false;
  }
   public submitSignIn():void{
   let allUsers = this.blogService.getUsers();
    for (let o of allUsers){
      if (o.email == this.emailSignIn && o.password == this.passwordSignIn ){
        this.isLogged = true;
        this.emailSignIn ='';
        this.passwordSignIn ='';
        this.isSigningIn = false;   
        this.name = o.name;
        this.id = o.id;
      }
          this.error = true;
    } 
   
   }
  // ****************************************** POST edit/delete
  public deletePost(i:number):void{
   this.posts.splice(i,1);
  }
  public editPost(i:number):void{
    this.isAddingPost = true;
    this.isEditPost = true;
    this.titlePost = this.posts[i].topic;
    this.textPost= this.posts[i].message ;
    this.id = i;
  }
  public saveEditPost():void{
    this.posts[this.id].topic= this.titlePost ;
    this.posts[this.id].message= this.textPost;
    this.posts[this.id].date = "edited at " + new Date().toLocaleString(); 
    this.isAddingPost = false;
    this.titlePost = '';
    this.textPost = '';
    this.isEditPost = false;

  }
  public checkEnabled(i:number): any {
    return this.posts[i].postedBy == this.name || this.id == 0 ;
  }
  }
 
