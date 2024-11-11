import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddmarketingComponent } from '../addmarketing/addmarketing.component';
import { MarketingInfoComponent } from '../marketing-info/marketing-info.component';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit{
  displayedColumns: string[] = ['campaign_name', 'clicks', 'conversion', 'action'];

  dataSource = [];

  constructor(
    private http:HttpClient,
    private dialog:MatDialog
  ){

  }

  ngOnInit(): void {
    this.getCampaigns()
  }

  getCampaigns(){
    const orgId=localStorage.getItem('orgId')
    this.http.get(`http://localhost:3000/getCampaigns/${orgId}`).subscribe((res:any)=>{
      this.dataSource=res.data
    })
  }
  addCampaign(){
    const dialogref=this.dialog.open(AddmarketingComponent , {
      width:"500px",
      height:"200px"
    })
    dialogref.afterClosed().subscribe(()=>{
      this.getCampaigns()
    })
  }

  showCampaignDetails(campaign:any){
    const dialogref=this.dialog.open(MarketingInfoComponent , {
      width:"500px",
      height:"500px",
      data:campaign
    })
    dialogref.afterClosed().subscribe(()=>{
      this.getCampaigns()
    })
  }
  

}
