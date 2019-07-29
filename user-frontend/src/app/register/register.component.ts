import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
signupForm:FormGroup;
selectedFile:File
private subscription: Subscription
u_id='0';

constructor(public auth: AuthenticationService,private route:Router) { }

ngOnInit(){

  this.signupForm= new FormGroup({

    u_name:new FormControl(null,[Validators.required, Validators.maxLength(50)]),
    u_email:new FormControl(null, [Validators.required, Validators.email]),
    u_password:new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/)]),
    c_password:new FormControl(null,[Validators.required]),
    u_profile:new FormControl(null,Validators.required),
    checkbox:new FormControl(null, Validators.required), 
    u_mobile:new FormControl(null,[Validators.required,Validators.maxLength(13),Validators.minLength(10)])  
  })

}

onFileSelect(event) {
  if (event.target.files.length > 0) {
   const file = event.target.files[0];
   this.selectedFile=file
  }
}



onRegister(){

  
  const formData= new FormData()
  formData.append('u_name',this.signupForm.get('u_name').value)
  formData.append('u_email',this.signupForm.get('u_email').value)
  formData.append('u_password',this.signupForm.get('u_password').value)
  formData.append('c_password',this.signupForm.get('c_password').value)
  formData.append('u_profile',this.selectedFile)
  formData.append('checkbox',this.signupForm.get('checkbox').value)
  formData.append('u_mobile',this.signupForm.get('u_mobile').value)
  formData.append('u_id',this.u_id)



  
  this.subscription=this.auth.register(formData).subscribe(
    ()=>{
          this.route.navigate(['/'])
        },
          err=>{
           console.log(err)
        }
      )
  
}

   
      
         
ngOnDestroy() {

  this.subscription.unsubscribe();
  
}
     

}
