import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'registration';
  public registrationForm: FormGroup;
  public submitted: boolean = false;
  public userList: Array<any> = [];
  public addressBlock: FormArray; 

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.registrationForm = this._formBuilder.group(
      {
        userName: ['JohnDoe', Validators.required],
        email: ['user@example.com', [Validators.required, Validators.email]],
        addresses: this._formBuilder.array([this.addAddressBlock('Banglore', 'Karnataka', '123456')]),

      },
    );
    this.addressBlock = this.registrationForm.get('addresses') as FormArray;
  }

  get registrationformControl() {
    return this.registrationForm.controls;
  }

  addAddressBlock(city?: any, state?: any, pincode?: any): FormGroup {
    return this._formBuilder.group({
      city: [city, Validators.required],
      state: [state, Validators.required],
      pincode: [pincode, Validators.required],
    });
  }

  addAddress(): void {
    this.addressBlock.push(this.addAddressBlock());
  }

  removeAddress(index: any) {
    if(index == 0 || this.addressBlock.length == 1){
      return;
    }
    this.addressBlock.removeAt(index);
  }

  getaddressFormGroup(index: any): FormGroup {
    const formGroup = this.addressBlock.controls[index] as FormGroup;
    return formGroup;
  }

  get addressFormGroup() {
    return this.registrationForm.get('addresses') as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    this.userList.push(this.registrationForm.value);
    console.log('this.userList', this.userList);
    this.onReset();
    alert('User dtails added successfully');
  }

  onReset() {
    this.submitted = false;
    this.registrationForm.reset();
  }

  removeUser(userIndex: any){
    this.userList.splice(userIndex, 1)
  }
}
