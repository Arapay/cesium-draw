import { style } from '@angular/animations';
import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';

declare var Cesium: {
  HorizontalOrigin: any;
  NearFarScalar: any;
  LabelStyle: any;
  PolylineDashMaterialProperty: any;
  GeometryInstance: any;
  SimplePolylineGeometry: any;
  defined: any;
  
  CallbackProperty: any;
  HeightReference: any;
  Color: any;
  Cartesian3: any;
  Entity: any;
  ScreenSpaceEventHandler: any;
  Math: any;
  Cartographic: any;
  ScreenSpaceEventType: any; Viewer: new (arg0: string) => any; 
};
@Component({
  selector: 'app-cesium',
  templateUrl: './cesium.component.html',
  styleUrls: ['./cesium.component.scss']
})

export class CesiumComponent implements OnInit {
  @ViewChild("cc") cc: any
  dotIndex: any;
  changeDetectorRef: any;
  typeofpoint!: boolean;
  constructor(private ChangeDetectorRef: ChangeDetectorRef) { }
  getIndex(activeIndex: any) {
  this.dotIndex = activeIndex;
  this.changeDetectorRef.markForCheck();
  this.changeDetectorRef.detectChanges();
}
  ngOnInit(): void {
    const viewer = new Cesium.Viewer('cc')
    //状态储存
    
    //var  value :any={inText: '中科星图'}
    var typeValue={
      typeofpoint:false,
      typeofline:false,
      typeofpolygon:false,
      typeoftext:false
    }
    //修改状态
    let btnPoint=document.getElementById('draw-point') as Element
    let btnLine=document.getElementById('draw-line') as Element
    let btnGon=document.getElementById('polygon') as Element
    let btnText=document.getElementById('write-text') as Element
    btnPoint.addEventListener("click",function(){
      typeValue.typeofpoint=true;typeValue.typeofline=false;typeValue.typeofpolygon=false;typeValue.typeoftext=false;
    })
    btnLine.addEventListener("click",function(){
      typeValue.typeofpoint=false;typeValue.typeofline=true;typeValue.typeofpolygon=false;typeValue.typeoftext=false;
    })
    btnGon.addEventListener("click",function(){
      typeValue.typeofpoint=false;typeValue.typeofline=false;typeValue.typeofpolygon=true;typeValue.typeoftext=false;
    })
    btnText.addEventListener("click",function(){
      typeValue.typeofpoint=false;typeValue.typeofline=false;typeValue.typeofpolygon=false;typeValue.typeoftext=true;
      var el = document.getElementById("test")as Element;
      el.removeAttribute('style');
    })
    var location = {
      latitude: 0,
      longitude: 0,
      height: 0,
      endPosition: null,
      cartesian : null
      };let drawPointLonLats: number[] = [];
      let drawpolygon: number[]=[];
      viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement: { endPosition: any; }) {
          //记录移动位置
          location.endPosition = viewer.scene.pickPosition(movement.endPosition);
          //console.log('location.endPosition:'+location.endPosition)
      },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      
      viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement: { position: any; }) {
          var cartesian = viewer.scene.pickPosition(movement.position);
          //记录点击位置
          location.cartesian = cartesian;
          console.log('location.cartesian:'+location.cartesian)
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          console.log('cartographic:'+cartographic)
          location.latitude = Cesium.Math.toDegrees(cartographic.latitude);
          location.longitude = Cesium.Math.toDegrees(cartographic.longitude);
          location.height = cartographic.height;
          // console.log(positions)
      },Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //dom操作、绑定点击
      let dian=document.getElementById('cc') as Element
      viewer.scene.globe.depthTestAgainstTerrain = true;
      
      dian.addEventListener("click",function() {
          console.log(typeValue.typeofpoint)
          console.log('点击了！')
          

            var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                    handler.setInputAction((movement: any) => {

                        var label = {
                            position : Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude,location.height),
                            name : 'cc',
                            point:{
                                pixelSize: 10,
                                color: Cesium.Color.fromCssColorString('#FFFF00'),
                                outlineColor: Cesium.Color.fromCssColorString('#fff'),
                                disableDepthTestDistance: 99000000,//Number.POSITIVE_INFINITY
                                heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
                                pixelOffset:new Cesium.Cartesian3(10,0),           //偏移
                                show: true
                            }
                        }; 
                        if(typeValue.typeofpoint){
                          viewer.entities.add(label);
                          //handler.destroy();
                      };
                        var label01 = {
                          position : Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude,location.height),
                          name : 'cc',
                          point:{
                              pixelSize: 10,
                              color: Cesium.Color.fromCssColorString('#0000FF'),
                              outlineColor: Cesium.Color.fromCssColorString('#fff'),
                              disableDepthTestDistance: 99000000,//Number.POSITIVE_INFINITY
                              heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
                              pixelOffset:new Cesium.Cartesian3(10,0),           //偏移
                              show: true
                          }
                      };
                       
                        var label02={
                            polyline: {
                              // fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。
                              positions: Cesium.Cartesian3.fromDegreesArray(
                                drawPointLonLats
                              ),//fromDegreesArray
                              // 宽度
                              width: 3,
                              // 线的颜色
                              material: Cesium.Color.RED,
                              clampToGround: true,
                              show: true
                            }
                     
                          }

                        if(typeValue.typeofline){
                          drawPointLonLats.push(location.longitude);
                          drawPointLonLats.push(location.latitude)
                          viewer.entities.add(label01);
                          viewer.entities.add(label02)
                        }
                        var label03={
                          name: "Red polygon on surface",
                          polygon: {
                            hierarchy: Cesium.Cartesian3.fromDegreesArray(
                              drawpolygon
                            ),
                            material: Cesium.Color.YELLOW.withAlpha(0.2),
                          },
                        }
                        if(typeValue.typeofpolygon){
                          
                          drawpolygon.push(location.longitude);
                          drawpolygon.push(location.latitude)
                          viewer.entities.add(label01);
                          viewer.entities.add(label02)
                          viewer.entities.add(label03)
                        }
                        var  veritoken = (document.getElementsByName( 'intext' )[ 0 ] as HTMLInputElement) .value
                        
                        var label04={
                          position : Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude,location.height),
                          name : 'label',
                          label:{
                              text:  veritoken,
                              font: '24px Helvetica',
                              fillColor: Cesium.Color.SKYBLUE,
                              outlineColor: Cesium.Color.BLACK,
                              outlineWidth: 5,
                              scale:1,
                              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                              disableDepthTestDistance: 99000000,//Number.POSITIVE_INFINITY
                              // heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
                              // //scaleByDistance: new Cesium.NearFarScalar(100, 1.0, 200, 0.4),
                              // horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
                              eyeOffset: new Cesium.Cartesian3(0, 0, -10000)
                          }
                      }
                      
                      if(typeValue.typeoftext && veritoken){
                        console.log('veritoken:'+veritoken)
                        drawpolygon.push(location.longitude);
                        drawpolygon.push(location.latitude)
                        viewer.entities.add(label04);
                      }
                        
                       }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                let clean=document.getElementById('clear') as Element
                clean.addEventListener("click",function() {
                  viewer.entities.removeAll();
                  drawpolygon=[];
                  drawPointLonLats=[]

                })
                    
    }) }

}
        
         



