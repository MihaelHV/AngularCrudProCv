import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  asesorForm !:FormGroup;
  actionBtn : string ='Save';
  constructor(private formBuilder:FormBuilder, 
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  this.asesorForm=this.formBuilder.group({
  asesorName:['',Validators.required],
  asesorApellido:['',Validators.required],
  asesorDNI:['',Validators.required]
  });
  

  if(this.editData){
    this.actionBtn="Update";
    this.asesorForm.controls['asesorName'].setValue(this.editData.asesorName);
    this.asesorForm.controls['asesorApellido'].setValue(this.editData.asesorApellido);
    this.asesorForm.controls['asesorDNI'].setValue(this.editData.asesorDNI);
  }


  }

  addAsesor(){
    if(!this.editData){
      if(this.asesorForm.valid){
        this.api.postAsesor(this.asesorForm.value)
        .subscribe({
          next:(res)=>{
            alert("Asesor registrado Correctamente")
            this.asesorForm.reset();
            this.dialogRef.close('save');
          },
    
          error:()=>{
            alert("Error al tratar de registrar asesor")
          }
        })
      }
     
    }else{
      this.updateAsesor();
    }
  
  }

  updateAsesor(){
    this.api.putAsesor(this.asesorForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Se actualizo el Asesor Correctamente");
        this.asesorForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error");
      }

    })
  }


}
