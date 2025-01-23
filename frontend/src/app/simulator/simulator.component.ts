import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators,} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import Swal from 'sweetalert2';
import {EmployeService} from '../shared/services/employe.service';
import {CompanyService} from '../shared/services/company.service';
import {SimulationService} from '../shared/services/simulation.service';
import {Router} from '@angular/router';
import {MatMenuTrigger} from "@angular/material/menu";
import { appconstants } from '../shared/constant';
import { MatSelectChange } from '@angular/material/select';
import { MatStepperModule} from '@angular/material/stepper';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-simulator',
  standalone: true,
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: false },
    },
  ],
  imports: [CommonModule, MatStepperModule, ReactiveFormsModule],
})
export class SimulatorComponent implements OnInit {
  banquesList: any;
  submitted = false;
  isMenuOpen = false;
  isPartnerMenuOpen = false;
  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  listEntreprises: any = [];
  panelOpenState = false;
  mensualite: any;
  isConsommation = false;
  isauto = false;
  isImmobiler = false;
  isLinear = true;
  minapport!: number;
  apportPercent!: number;
  maxAnnee!: number;
  currentMontant: number = 0;
  duree: number = 1;
  apportPersonnel: number = 0;
  favoriteSeason!: string;
  @ViewChild(MatMenuTrigger, {static: false}) trigger!: MatMenuTrigger;
  recheckIfInMenu!: boolean;
  banques: string[] = [
    'Société Tunisienne de Banque « STB »',
    'Banque Nationale Agricole « BNA »',
    'Banque de l’Habitat « BH »',
    'Banque de Financement des Petites et Moyennes entreprises « BFPME »',
    'Banque Tunisienne de Solidarité « BTS »',
    'Banque de Tunisie et des Emirats « BTE »',
    'Banque Tuniso-Libyenne « BTL »',
    'Tunisian Saudi Bank « TSB »',
    'Banque Zitouna',
    'Al Baraka Bank',
    'Al Wifak International Bank',
    'Amen Bank',
    'Attijari Bank',
    'Arab Tunisian Bank « ATB »',
    'Arab Banking Corporation « ABC »',
    'Banque Internationale Arabe de Tunisie «  BIAT »',
    'Banque de Tunisie « BT »',
    'Banque Tuniso Koweitienne « BTK »',
    'Banque Franco Tunisienne « BFT »',
    'Citi Bank',
    'Qatar National Bank- Tunis « QNB-Tunis »',
    'Union Bancaire de Commerce et d’Industrie «  UBCI »',
    'Union Internationale de Banque «  UIB »',
  ];
  statusForm!: FormGroup;
  natureCreditForm!: FormGroup;
  revenuForm!: FormGroup;
  montantForm!: FormGroup;
  banqueForm!: FormGroup;
  prospectForm!: FormGroup;
  simulationForm!: FormGroup;
  secondFormGroup!: FormGroup;
  @ViewChild('stepper') private stepper!: MatStepper;

  langue=[
    {'url':'https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_United_Kingdom.png','lang':'English','translate':'en'},
    {'url':'https://cdn2.iconfinder.com/data/icons/world-flags-1-1/100/Tunisia-256.png','lang':'العربية','translate':'ar'},
  ]
  langSelect:any=this.langue[0]

  constructor(
    private formBuilder: FormBuilder,
    private EmpService: EmployeService,
    private companyService: CompanyService,
    private simulationService: SimulationService,
    private router: Router
    ,private translateService: TranslateService    
  ) {
    translateService.addLangs(['en','ar']);
    translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem("lang") ?? 'en');

  }

  ngOnInit(): void {
    this.getAllCompnaies();
    this.getAllBanks();
    this.statusForm = new FormGroup({
      select: new FormControl('', [Validators.required]),
    });
    this.natureCreditForm = new FormGroup({
      nature: new FormControl('', [Validators.required]),
    });
    this.revenuForm = new FormGroup({
      salaire: new FormControl('', [Validators.required]),
      dividendes: new FormControl(0),
      autre: new FormControl(0),
    });
    this.montantForm = new FormGroup({
      montant: new FormControl('', [Validators.required]),
    });
    this.banqueForm = new FormGroup({
      nomBanque: new FormControl('', [Validators.required]),
      creditEncours: new FormControl(''),
      // mensualiteCredit: new FormControl(''),
      checkImpayé: new FormControl(''),
    });
    this.prospectForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
      birthday: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      status: new FormControl(''),
      note: new FormControl(''),
      simulation: new FormControl(''),
      // companyPhoto: new FormControl('', [Validators.required]),
      // companyPhoto: new FormControl('', [Validators.required]),
    });
    this.simulationForm = new FormGroup({
      // employee: new FormControl('', [Validators.required]),
      contractType: new FormControl('', [Validators.required]),
      creditType: new FormControl('', [Validators.required]),
      grossSalary: new FormControl(0, [Validators.required]),
      dividend: new FormControl(0),
      other: new FormControl(0),
      amount: new FormControl('', [Validators.required]),
      personalContribution: new FormControl('', [Validators.required]),
      duration: new FormControl(1, [Validators.required]),
      bank: new FormControl('', [Validators.required]),
      oldCredit: new FormControl('', [Validators.required]),
      check: new FormControl('', [Validators.required]),
      eligibility: new FormControl('', [Validators.required]),
      monthlyPayment: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),
      birthday: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      status: new FormControl(''),
      note: new FormControl(''),
    });

    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl('', [Validators.required]),
    });
    this.recheckIfInMenu = false;
  }

  openResourceMenu() {
    this.trigger.openMenu();
  }

  closeResourceMenu() {
    setTimeout(() => {
      if (this.recheckIfInMenu === false) {
        this.trigger.closeMenu();
      }
    }, 150);
  }

  first(){
    this.stepper.reset();
  }

  firstform() {
     if (this.statusForm.value.select == 'contractuel') {
       Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success swal-custom-cancel',
          cancelButton: 'btn btn-danger swal-custom-cancel'
        },
        buttonsStyling: true
      }).fire({
          title: '',
         text: "Please contact us to verify your eligibility for a loan. - يرجى التواصل معنا للتحقق من مؤهلاتك للحصول على قرض",
         icon: 'error',
         showCancelButton: true,
         confirmButtonText: 'us contact - اتصل بنا',
          cancelButtonText: 'close - إغالق',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/contact-nous']);
          } 
})
     } else {
       this.stepper.next();
     }
    console.log(this.statusForm.value);
    this.simulationForm.patchValue({
      contractType: this.statusForm.value.select,
    });
  }


  changeApport(){
    console.log(this.natureCreditForm.value);
    this.simulationForm.patchValue({
      creditType: this.natureCreditForm.value.nature,
    });
    if (this.natureCreditForm.value.nature == 'immobilier') {
      this.isImmobiler = true;
      this.isConsommation = false;
      this.isauto = false;
      this.maxAnnee = 20;
      this.minapport = 0;
      this.apportPercent = 20;
      this.apportPersonnel=this.montantForm.value.montant*0.2
    } else if (this.natureCreditForm.value.nature == 'auto') {
      this.isImmobiler = false;
      this.isConsommation = false;
      this.isauto = true;
      this.maxAnnee = 7;
      this.minapport = 0;
      this.apportPercent = 40;
      this.apportPersonnel=this.montantForm.value.montant*0.4
    } else {
      this.isImmobiler = false;
      this.isauto = false;
      this.isConsommation = true;
      this.maxAnnee = 5;
      this.minapport = 0;
      this.apportPercent = 0;
    }
  }

  natureCreditCheck() {
    console.log(this.natureCreditForm.value);
    this.simulationForm.patchValue({
      creditType: this.natureCreditForm.value.nature,
    });
    if (this.natureCreditForm.value.nature == 'immobilier') {
      this.isImmobiler = true;
      this.isConsommation = false;
      this.isauto = false;
      this.maxAnnee = 20;
      this.minapport = 0;
      this.apportPercent = 20;
      this.apportPersonnel=this.montantForm.value.montant*0.2
    } else if (this.natureCreditForm.value.nature == 'auto') {
      this.isImmobiler = false;
      this.isConsommation = false;
      this.isauto = true;
      this.maxAnnee = 7;
      this.minapport = 0;
      this.apportPercent = 40;
      this.apportPersonnel=this.montantForm.value.montant*0.4
    } else {
      this.isImmobiler = false;
      this.isauto = false;
      this.isConsommation = true;
      this.maxAnnee = 5;
      this.minapport = 0;
      this.apportPercent = 0;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  togglePartnerMenu() {
    this.isPartnerMenuOpen = !this.isPartnerMenuOpen;
  }

  revenueCheck() {
    this.submitted1 = true;
    console.log(this.revenuForm.value);
    console.log(this.revenuForm.valid);
    if (this.revenuForm.valid) {
      console.log('valid');
      let sum =
        this.revenuForm.value.salaire +
        this.revenuForm.value.dividendes +
        this.revenuForm.value.autre;

      console.log(sum);
      if (sum < 1) {
        Swal.mixin({
          customClass: {confirmButton: 'btn btn-success'},
        }).fire({
          // title: 'Are you sure?',
          text: "Malheureusement , Votre avis d'eligibilté est defavorable",
          icon: 'error',

          confirmButtonText: 'Close',

          reverseButtons: true,
        });
      } else {
        this.stepper.next();
        this.simulationForm.patchValue({
          grossSalary: this.revenuForm.value.salaire,
          dividend: this.revenuForm.value.dividendes,
          other: this.revenuForm.value.autre,
        });
      }
    }
  }

  checkMontant() {
    this.submitted2 = true;
    console.log('Montant', this.currentMontant);
    console.log('apportpersonnel', this.apportPersonnel);
    console.log('duree', this.duree);
    this.simulationForm.patchValue({
      amount: this.currentMontant,
      personalContribution: this.apportPersonnel,
      duration: Number(this.duree),
    });
  }

  banqueCheck() {
    console.log(this.banqueForm.value);
    if (
      this.banqueForm.value.creditEncours == "false" &&
      this.banqueForm.value.checkImpayé == "false"
    ) {
      this.simulationForm.patchValue({
        bank: this.banqueForm.value.nomBanque,
        oldCredit: this.banqueForm.value.creditEncours == 'true',
        check: this.banqueForm.value.checkImpayé == 'true',
      });
      this.checkEligibilte();
    } else {
  
      Swal.mixin({
        customClass: {confirmButton: 'btn btn-success'},
      }).fire({
        // title: 'Are you sure?',
        text: "Please contact us to verify your eligibility for a loan. - يرجى التواصل معنا للتحقق من مؤهلاتك للحصول على قرض",
        icon: 'error',

        confirmButtonText: 'Close',

        reverseButtons: true,
      });
    }
  }

  checkEligibilte() {
    console.log(this.duree)
    if (!this.duree) {
      this.duree = 1;

    }
    let t = 9.26;
    let n = this.duree * 12;
    let M = this.montantForm.value.montant - this.apportPersonnel;

    let a = M * (t / 100 / 12);
    let x = 1 + t / 100 / 12;

    let y = Math.pow(x, -n);

    let b = 1 - y;
    let mens = a / b;
    this.mensualite = mens.toFixed(3);
    console.log(
      'taux',
      t,
      'duree',
      n,
      'montant',
      M,
      'apport',
      this.apportPersonnel
    );

    console.log('mensualtéé', mens);

    console.log('calcul', (this.revenuForm.value.salaire/12)*0.4);

    if( (this.revenuForm.value.salaire/12)*0.4>=this.mensualite){
      this.simulationForm.patchValue({
        monthlyPayment: Number(this.mensualite),
        eligibility: true,
      });
      this.stepper.next();
    }else{
      this.simulationForm.patchValue({
        monthlyPayment: Number(this.mensualite),
        eligibility: false,
      });
      Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success swal-custom-cancel',
          cancelButton: 'btn btn-danger swal-custom-cancel'
        },
        buttonsStyling: true
      }).fire({
          title: '',
         text: "Please contact us to verify your eligibility for a loan. - يرجى التواصل معنا للتحقق من مؤهلاتك للحصول على قرض",
         icon: 'error',
         showCancelButton: true,
         confirmButtonText: 'us contact - اتصل بنا',
         cancelButtonText: 'close - إغالق',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/contact-nous']);
          } 
})
    }

    
   
  }
 
  
  setBubble(range: HTMLInputElement, bubble: HTMLOutputElement) {
    const val = Number(range.value);
    const min = Number(range.min) || 0;  
    const max = Number(range.max) || 100;  
    const newValue = ((val - min) * 100) / (max - min);
    
    bubble.value = val + '%';  
    const newPosition = 10 - newValue * 0.2;
    bubble.style.left = `calc(${newValue}% + (${newPosition}px))`;

    this.apportPersonnel = (this.currentMontant / 100) * val;
    this.apportPersonnel = Number(this.apportPersonnel.toFixed(2));  
}



inpmontant(e: Event) {
  const inputElement = e.target as HTMLInputElement; 
  console.log(inputElement.value); 
  this.currentMontant = Number(inputElement.value); 
  this.apportPersonnel = (this.currentMontant / 100) * this.apportPercent; 
  this.apportPersonnel = Number(this.apportPersonnel.toFixed(2)); 
}


setDuree(range: HTMLInputElement, bubble: HTMLOutputElement) {
  const val = range.value; 
  const str = val === '1' ? ' an' : ' ans'; 
  bubble.value = val + str; // Met à jour la valeur de l'élément output
  this.duree = Number(val); 

  const newValue = Number(
      ((Number(range.value) - Number(range.min)) * 100) / (Number(range.max) - Number(range.min))
  );
  const newPosition = 10 - newValue * 0.2;
  bubble.style.left = `calc(${newValue}% + (${newPosition}px))`;
}



  saveProspect() {
    this.submitted = true;
    this.simulationForm.patchValue(this.prospectForm.value);
    this.simulationForm.patchValue({type: 'normal'});
    if (this.simulationForm.valid) {
      this.simulationService
        .saveSimulation(this.simulationForm.value)
        .then((res: any) => {
          if (res.error) {
            if (res.error.error === 'Email existe déjà') {
              Swal.mixin({
                customClass: {confirmButton: 'btn btn-success'},
              }).fire({
                // title: 'Are you sure?',
                text: res.error.error,
                icon: 'error',

                confirmButtonText: 'Close',

                reverseButtons: true,
              });
            }
          } else {
            Swal.mixin({
              customClass: {confirmButton: 'btn btn-success'},
            })
              .fire({
                // title: 'Are you sure?',
                text: 'Simulation enregistrée avec succés',
                icon: 'success',

                confirmButtonText: 'Close',

                reverseButtons: true,
              })
              .then((res) => {
                if (res.isConfirmed || res.isDismissed) {
                  // this.getAllEmployes();
                  // this.modalService.dismissAll();
                  this.onReset();
                  this.router.navigate(['/']);
                }
              });
          }
        });
    } else {
      Swal.mixin({
        customClass: {confirmButton: 'btn btn-success'},
      }).fire({
        // title: 'Are you sure?',
        text: 'Veuillez remplir tous les chapms SVP',
        icon: 'error',

        confirmButtonText: 'Close',

        reverseButtons: true,
      });
    }
  }

  getAllBanks() {
    this.companyService.getBanks().then((res: any) => {
      console.log('all banks: ', res);
      if (res.status) {
        this.banquesList = res.data.results.reverse();
      }
    });

    this.banquesList =appconstants.banks;
  }

  getAllCompnaies() {
    this.companyService.getCompanies().then((res: any) => {
      console.log('all compnaies: ', res);
      if (res.status) {
        this.listEntreprises = res.data.results.reverse();
      }
    });
  }

  onItemChange(e: MatSelectChange) {
    console.log(e.value);
}


  get f() {
    return this.prospectForm.controls;
  }

  get f1() {
    return this.revenuForm.controls;
  }

  get f2() {
    return this.montantForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.submitted1 = false;
    this.submitted2 = false;
    this.prospectForm.reset();
    this.revenuForm.reset();
  }
}
