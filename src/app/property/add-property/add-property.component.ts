import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
//@ViewChild('form') addPropertyForm: NgForm;
@ViewChild('formTabs') formTabs: TabsetComponent;
nextClicked :boolean;
addPropertyForm: FormGroup;
property = new Property();


bhkTypes: Array<string>=['1','2','3','4'];
propertyTypes :Array<string>= ['House', 'Apartment', 'Duplex'];
furnishTypes : Array<string>=['Fully', 'Semi', 'Unfurnished'];
directions: Array<string>=['East','West','South','North'];
propertyView: IPropertyBase = {
  Id: null,
  Name: '',
  Price: null,
  SellRent: null,
  PType: null,
  FType: null,
  BHK: null,
  BuiltArea: null,
  City: null,
  RTM: null
};
  constructor(private router: Router,
    private fb: FormBuilder,
    private housingService: HousingService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }
  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: [1 , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),
      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
    });
  }
  get BasicInfo(){
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }
  get PriceInfo() {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }

  //#region <Form Controls>
  get SellRent() {
    return this.BasicInfo.get('SellRent');
  }

  get BHK() {
    return this.BasicInfo.get('BHK');
  }

  get PType() {
    return this.BasicInfo.get('PType');
  }

  get FType() {
    return this.BasicInfo.get('FType');
  }

  get Name() {
    return this.BasicInfo.get('Name');
  }

  get City() {
    return this.BasicInfo.get('City');
  }

  get Price() {
    return this.PriceInfo.get('Price');
  }

  get BuiltArea() {
    return this.PriceInfo.get('BuiltArea');
  }

  get CarpetArea() {
    return this.PriceInfo.get('CarpetArea');
  }

  get Security() {
    return this.PriceInfo.get('Security');
  }

  get Maintenance() {
    return this.PriceInfo.get('Maintenance');
  }

  get FloorNo() {
    return this.AddressInfo.get('FloorNo');
  }

  get TotalFloor() {
    return this.AddressInfo.get('TotalFloor');
  }

  get Address() {
    return this.AddressInfo.get('Address');
  }

  get LandMark() {
    return this.AddressInfo.get('LandMark');
  }

  get RTM() {
    return this.OtherInfo.get('RTM');
  }

  get PossessionOn() {
    return this.OtherInfo.get('PossessionOn');
  }

  get AOP() {
    return this.OtherInfo.get('AOP');
  }

  get Gated() {
    return this.OtherInfo.get('Gated');
  }

  get MainEntrance() {
    return this.OtherInfo.get('MainEntrance');
  }

  get Description() {
    return this.OtherInfo.get('Description');
  }

  //methods
  onBack() {
    this.router.navigate(['/']);
  }
  onSubmit(){
    this.nextClicked= true;
    if(this.allTabsValid()){
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats, your property listed successfully on our website');
      console.log(this.addPropertyForm);

      if(this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    }else {
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked= true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
      }


}
