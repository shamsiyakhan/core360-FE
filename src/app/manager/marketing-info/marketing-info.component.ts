import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marketing-info',
  templateUrl: './marketing-info.component.html',
  styleUrls: ['./marketing-info.component.scss']
})
export class MarketingInfoComponent {
  copySuccess: string | null = null;
  addCategory=this.fb.group({
    campaign_name:['']
  })
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<MarketingInfoComponent>,
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ){

  }

  close(){
    this.dialogRef.close()
  }

  copyLink(inputElement: HTMLInputElement): void {
    navigator.clipboard.writeText(inputElement.value).then(() => {
      this.copySuccess = inputElement === inputElement.closest('div')?.querySelector('input') ? 'clicks' : 'conversion';
    }).catch(() => {
      alert('Failed to copy text.');
    });
  
    // Hide the success message after 2 seconds
    setTimeout(() => {
      this.copySuccess = null;
    }, 2000);
  }
  
  
  addCategories(){
    const orgid=localStorage.getItem('orgId')
    this.http.post(`http://localhost:3000/addCampaign/${orgid}` , this.addCategory.value).subscribe((res:any)=>{
      if(res.data){
        Swal.fire({
          text:"Campaign Added",
          icon:"success",
          confirmButtonText:"Ok"
        })
        this.dialogRef.close()
      }else{
        Swal.fire({
          text:"Campaign Add operation Failed",
          icon:"error",
          confirmButtonText:"Ok"
        })
      }
    })
  }
}
