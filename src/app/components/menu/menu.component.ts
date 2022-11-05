import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // gestion de sidenav para responsive web design
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private oberver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.oberver.observe(['(max-width: 800px)']).subscribe((res) =>{
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

}
