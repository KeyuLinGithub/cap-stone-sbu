// this.layer.addGeoJson(n_p);
// //add color for the layer
// var temp=this.layer;
// this.layer.forEach(function (feature) {
//     temp.overrideStyle(feature, {
//       fillColor: feature.getProperty('fill'),
//       fillOpacity: 0.2,
//       strokeColor: '#000000',
//       strokeWeight: 1,
//       zIndex: 1
//     })
// });


//import all geojson
import c_c_d from '../geodata/c_c_d.json';
import n_c_d from '../geodata/1.json';
import o_c_d from '../geodata/o_c_d_test.json';
import n_p from '../geodata/2.json';
import c_p from '../geodata/c_p.json';
import o_p from '../geodata/o_p_test.json';

// if(dLevel==="congressional"){
//   this.layer.addGeoJson(c_c_d);
// }else{
//   this.layer.addGeoJson(c_p);
// }
// this.layer.setStyle({
//     fillColor: '#b0987a',
//      fillOpacity: 0.4,
//      strokeColor: '#000000',
//     strokeWeight: 1,
//      zIndex: 1,
//     visible: true
// });


// if(dLevel==="congressional"){
//   this.layer.addGeoJson(n_c_d);
// }else{
//   this.layer.addGeoJson(n_p);
// }
// //add color for the layer
// var temp=this.layer;
// this.layer.forEach(function (feature) {
//   //console.log(feature.getProperty('fill'))
//     temp.overrideStyle(feature, {
//       fillColor: feature.getProperty('fill'),
//       fillOpacity: 0.2,
//       strokeColor: '#000000',
//       strokeWeight: 1,
//       zIndex: 1
//     })
// });
// this.layer.setStyle({
//     fillColor: '#b0987a',
//      fillOpacity: 0.4,
//      strokeColor: '#000000',
//     strokeWeight: 1,
//      zIndex: 1,
//     visible: true
// });





// if(dLevel==="congressional"){
//   this.layer.addGeoJson(o_c_d);
//   this.layer.setStyle({
//       fillColor: '#b0987a',
//        fillOpacity: 0.4,
//        strokeColor: '#000000',
//       strokeWeight: 1,
//        zIndex: 1,
//       visible: true
//   });
// }else{
//   this.layer.addGeoJson(o_p);
// }
// //add color for the layer
// var temp=this.layer;
// this.layer.forEach(function (feature) {
//
//     console.log(feature.getProperty('fill'));
//     temp.overrideStyle(feature, {
//       fillColor: feature.getProperty('fill'),
//       fillOpacity: 0.2,
//       strokeColor: '#000000',
//       strokeWeight: 1,
//       zIndex: 1
//     })
// });





// testFetch(){
//     fetch(`http://www.reddit.com/search.json?q=food`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       if(this.state.algorithmStatus=='running'){
//         this.testFetch();
//       }
//     })
//     .catch(err => console.log(err));
// }




// var data={pricienctID:"111",fill:"#000"};
// this.updateMapChange(data);
// var temp=this.layer;
// this.layer.forEach(function (feature) {
//     if(feature.f.VTDI10=== "A"){
//       temp.overrideStyle(feature, {
//         fillColor: '#f3370f',
//         fillOpacity: 0.2,
//         strokeColor: '#000000',
//         strokeWeight: 1,
//         zIndex: 1
//       })
//     }
//
// });


// console.log(data);
// console.log(Object.values(data));
// console.log(Object.values(data)[0]);


componentWillUpdate(nextProps, nextState) {
    console.log(nextState.algorithmStatus);
 }
