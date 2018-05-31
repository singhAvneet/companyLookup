import { Component, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() tabSelected: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    // var el = document.getElementById('mySidenav');
  }

  onClickLink(tabNAme){

    this.tabSelected.emit(tabNAme);
  }
   openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

 closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

}
