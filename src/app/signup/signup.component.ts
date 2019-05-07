import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder,FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  [x: string]: any;
  myForm: FormGroup;
  errorMsg : Boolean = false
  successMsg : Boolean = false
  // post:any;
  res : String [];
  username : String = '';
  email : String = '';
  mobileNo : String = ''
  password : String = '';
  url = environment.baseUrl+'/signup'
  msg : String = ''
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    console.log('url',this.url)
  }
  
  onSubmit($event){
    $event.preventDefault();//stop here if form is invalid
    let headers = new Headers();
    let data = {
      "username": this.username,
      "email":this.email,
      "password": this.password,
      "phoneNo" : this.mobileNo
  }
    return this.http.post(this.url,data)
        .subscribe(
            data => {
              console.log(data)
              this.msg = data['message']
                if(data['status'] == 200)
                {
                    this.successMsg = true
                    this.errorMsg =false
                    
                } else {
                  this.successMsg = false
                  this.errorMsg =true
                }
                console.log("POST Request is successful ", data);
            },
            error => {
                this.successMsg = ''
                this.errorMsg = 'Something went wrong !'
                console.log("Rrror", error);
            }
        )
  }
  

}
