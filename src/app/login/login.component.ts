import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder,FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  [x: string]: any;
  myForm: FormGroup;
  errorMsg : Boolean = false
  successMsg : Boolean = false
  // post:any;
  email : String = '';
  password : String = '';
  url = environment.baseUrl+'/login'
  msg : String = ''
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    console.log('url',this.url)
  }
  
  onSubmit($event){
    $event.preventDefault();//stop here if form is invalid
    let headers = new Headers();
    let data = {
      "email":this.email,
      "password": this.password
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
                this.successMsg = false
                this.errorMsg = true
                this.msg = 'Something went wrong'
                console.log("Rrror", error);
            }
        )
  }

}
