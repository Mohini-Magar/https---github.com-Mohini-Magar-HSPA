import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  userSubmitted : boolean;
  constructor(private fb: FormBuilder, private userService : UserService, private alertifyService: AlertifyService) { }

  ngOnInit() {
     this.createRegisterationForm();
  }
  createRegisterationForm() {
    this.registrationForm =  this.fb.group({
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, Validators.required],
        mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, {validators: this.passwordMatchingValidator});
}
  passwordMatchingValidator(fg: FormGroup) : Validators{
    return fg.get('password').value === fg.get('confirmPassword').value? null : {notMatched : true};
  }



  onSubmit(){
    this.userSubmitted = true;
    if(this.registrationForm.valid){
    this.userService.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted = false;
    this.alertifyService.success('Congrats, you are successfully registered')
  }else{
    this.alertifyService.error("Kindly provide the required fields");

  }
  }

  userData(): User{
    return this.user ={
        userName : this.userName.value,
        email : this.email.value,
        password : this.password.value,
        mobile : this.mobile.value

    }
  }

  //get method for all form controller
  get userName() {
    return this.registrationForm.get('userName');
}
get email() {
return this.registrationForm.get('email');
}
get password() {
return this.registrationForm.get('password');
}
get confirmPassword() {
return this.registrationForm.get('confirmPassword');
}
get mobile() {
return this.registrationForm.get('mobile');
}
}
