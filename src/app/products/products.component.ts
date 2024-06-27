import {  Component, OnInit } from '@angular/core';
import { ProductInformationService } from '../Services/product-information.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
dressList:any[]=[];
currentIndex: number = 0;
staticCard:number=0;

  constructor(private proInfo:ProductInformationService) {

   }

   ngOnInit(): void {
    const customImagePaths = [
      'assets/Image-Master@2x.png',
      'assets/Image-Master-2.png',
      'assets/Image-Master-1.png',
      'assets/Image-Master-3.png',
      'assets/Image-Master-4.png',
      'assets/Image-Master-5.png'
    ];

    this.proInfo.getDressList().subscribe(
      (data) => {
        this.dressList = data.data.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
          images: [customImagePaths[index % customImagePaths.length]]
        }));
        this.staticCard = this.dressList.length - 1;
      },
      (error) => {
        console.error('Error fetching dress list', error);
      }
    );
  }
  getDressImage(dressId: number): string {
    const dressIndex = this.dressList.findIndex(d => d.id === dressId);
    const dress = this.dressList[dressIndex];
    return dress ? dress.images[0] : '';
  }
  previousDress() {
    this.currentIndex = (this.currentIndex + 1) % this.dressList.length;
  }
  nextDress() {
    this.currentIndex = (this.currentIndex - 1 + this.dressList.length) % this.dressList.length;
  }
  get currentDress() {
    return this.dressList[this.staticCard];
  }
  get otherDresses() {
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.dressList.length) {
      nextIndex = 0;
    }
    return this.dressList.slice(nextIndex, -1).concat(this.dressList.slice(0, nextIndex));
  }
}
