import { Component, OnInit } from '@angular/core';
import { ProductInformationService } from '../Services/product-information.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  dressList: any = [];
  currentIndex: number = 0;
  staticCard: number = 0;

  Imgurl: string = 'http://165.232.44.99/';
  arr=[]

  ProdImg: string = '';
  priCardNo :any = 0;
  constructor(private proInfo: ProductInformationService) {}
    customImagePaths:any;

  ngOnInit(): void {
     this.customImagePaths = [
      'assets/Image-Master@2x.png',
      'assets/Image-Master-2.png',
      'assets/Image-Master-1.png',
      'assets/Image-Master-3.png',
      'assets/Image-Master-4.png',
      'assets/Image-Master-5.png',
    ];
   
    this.proInfo.getDressList().subscribe(
      (data: any) => {
        this.dressList = data.data;
        console.log(this.dressList);
        // this.dressList = data.data.map((item: any, index: number) => ({
        //   ...item,
        //   id: index + 1,
        //   // images: [customImagePaths[index % customImagePaths.length]]
        //   images: item.images
        // }));
        // this.staticCard = this.dressList.length - 1;
        // console.log(this.dressList[0].images);
      },
      (error) => {
        console.error('Error fetching dress list', error);
      }
    );

  }

  getImageUrl(imgPath:any){
    console.log(imgPath);
    return imgPath;
  }

  getDressImage(dressId: any): string {
    console.log(dressId);
    // const dressIndex = this.dressList.findIndex(d => d.id === dressId);
    // const dress = this.dressList[dressIndex];
    return dressId ? dressId.images[0] : '';
  }

  priImg:any;
  previousDress(dress:any,img:any,prodcard:any) {
    // // this.currentIndex = (this.currentIndex + 1) % this.dressList.length;
    if(this.priCardNo == prodcard.id ){
      this.priImg  = document.getElementById(img.id);
      if (this.currentIndex > 0) {
        this.currentIndex = this.currentIndex - 1;
        this.priImg.src  = this.Imgurl+dress[this.currentIndex]
      }
    }
    else{
      this.currentIndex = 0;
    }
    this.priCardNo = prodcard.id
    // console.log(this.currentIndex,this.priImg);
  }

  nextImg:any;
  nextDress(dress:any , imgid:any,prodcard:any) {
    // this.currentIndex = (this.currentIndex - 1 + this.dressList.length) % this.dressList.length;
    
      if (this.priCardNo == prodcard.id) {
        this.nextImg  = document.getElementById(imgid.id);
        if (this.currentIndex < dress.length-1) {
          this.currentIndex = this.currentIndex + 1;
          this.nextImg.src  = this.Imgurl+dress[this.currentIndex]
        }else{
          this.currentIndex = 0;
          this.nextImg.src  = this.Imgurl+dress[this.currentIndex]
        }
      } else {
        this.currentIndex = 0;
      }
      this.priCardNo = prodcard.id  
    // console.log(this.currentIndex);
  }

  get currentDress() {
    return this.dressList[this.staticCard];
  }

  get otherDresses() {
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.dressList.length) {
      nextIndex = 0;
    }

    return this.dressList
      .slice(nextIndex, -1)
      .concat(this.dressList.slice(0, nextIndex));
  }

}