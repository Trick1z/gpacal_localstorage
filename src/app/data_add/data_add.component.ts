import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-temp',
  templateUrl: './data_add.component.html',
  styleUrls: ['./data_add.component.scss']
})
export class data_addComponent {

  Scorebox = {} as any;
  sums: number = 0;
  grade: any = [];
  u_arr: any = [];


  student: any;
  u_score = {} as any;
  name: string = '';




  getScoreValue() {


    console.log("name => ", this.Scorebox.Name);

    var error = 0;
    //value
    var arr = [parseFloat(this.Scorebox.Thai), parseFloat(this.Scorebox.English),
    parseFloat(this.Scorebox.Math), parseFloat(this.Scorebox.Science),
    parseFloat(this.Scorebox.Sport),];
    console.log("arr", arr);



    if (this.Scorebox.Name === undefined || this.Scorebox.Name === " ") {
      Swal.fire({
        title: 'Submit Failed',
        text: 'Please Enter The Name',
        icon: 'error',
        confirmButtonText: 'OK'
      })

    } else {

      for (let arr_i = 0; arr_i < arr.length; arr_i++) {

        if (typeof arr[arr_i] === 'string'  || isNaN(arr[arr_i]) == true || arr[arr_i] > 100 || arr[arr_i] < 0) {
          error += 1;
        }
      }

      if (error > 0) {
        Swal.fire({
          title: 'Submit Failed',
          text: ' score must be a number!! \nand\n each score must between 0 - 100 ',
          icon: 'error',
          confirmButtonText: 'Alright'
        })

      } else {
        var gn = [80, 75, 70, 65, 60, 55, 50, 0];
        var gnc = [4, 3.5, 3, 2.5, 2, 1.5, 1, 0];
        var gs = ["A", "B+", "B", "C+", "C", "D+", "D", "F"];

        //store data
        var res: any = [];

        //sum of data for cal
        var result = 0;

        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < gn.length; j++) {
            if (arr[i] >= gn[j]) {
              res.push(gnc[j]);
              this.grade.push(gs[j]);
              break;
            }
          }
        }

        console.log("gpa each => ", res);
        console.log("grade => ", this.grade);

        // add sums
        for (let gradecal = 0; gradecal < res.length; gradecal++) {
          result += res[gradecal];
        }

        this.sums = (result * 3) / 15;

        //seve data
        let u_name = {
          name: this.Scorebox.Name,
          gpa: this.sums,
          thai: this.grade[0],
          english: this.grade[1],
          math: this.grade[2],
          science: this.grade[3],
          sport: this.grade[4]
        };

        //send data
        this.u_arr.push(u_name)
        localStorage.setItem('student', JSON.stringify(this.u_arr));

        Swal.fire({
          title: 'Submit Successfuly',
          icon: 'success',
          confirmButtonText: 'OK'
        })

        //clear data
        this.grade = [];
        error = 0;
      }
    }
  }
}
