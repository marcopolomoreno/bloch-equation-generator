Bloch Equation Generator (SimuFísica Platform) - Submission Package
===================================================================

## 📄 Related Publication

For a detailed description of the software and its applications, refer to the following manuscript:

**M. P. M. de Souza, G. H. H. Pavão, A. A. C. de Almeida, S. S. Vianna**,  
*The Bloch Equation Generator – SimuFísica*,  
arXiv:2506.01108 [quant-ph]  
[https://doi.org/10.48550/arXiv.2506.01108](https://doi.org/10.48550/arXiv.2506.01108)

Please cite this work if you use the Bloch Equation Generator in your research.


License:
--------
This software is licensed under the MIT License.
You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
subject to the inclusion of the original copyright notice and this permission notice
in all copies or substantial portions of the Software.
The software is provided "as is", without warranty of any kind.

Program Description:
--------------------
This package contains the source code for the Bloch Equation Generator, a web-based application 
designed to generate and display optical Bloch equations for multilevel quantum systems. 
It also generates C source code to numerically solve the equations using the fourth-order 
Runge-Kutta method. This tool is part of the SimuFísica platform but functions independently 
without requiring the full platform.

Directory Structure:
--------------------
- assets/
  - css/                  : Stylesheets for interface formatting
  - js/                   : JavaScript files for interface control
- index.html              : Main HTML file that runs the application
- b8d451a227.js           : Main JavaScript logic of the generator
- download-codigo-fonte/
  - dessintonia.js        : Generates C code for frequency-domain solutions
  - tempo.js              : Generates C code for time-domain solutions

Usage Instructions:
-------------------
1. Extract the folder.
2. Open the file:
   index.html in any modern web browser (Chrome, Firefox, Edge).
3. No installation is required.
4. The application interface allows configuration of energy levels, couplings,
   and decay rates, then displays the corresponding optical Bloch equations.
5. Generated C source code can be downloaded using the provided buttons.
6. Make the necessary adjustments to the downloaded C source code.
7. Compile the source code using Bloodshed C++ ([https://www.bloodshed.net/](https://www.bloodshed.net/) – Windows) or Online C Compiler ([https://www.onlinegdb.com/online\_c\_compiler](https://www.onlinegdb.com/online_c_compiler) – for testing purposes only).


Notes:
------
- The "Save" button is disabled in this version, as it depends on backend database infrastructure 
  not included in this submission. 
- For a complete version of the software, visit:
  https://simufisica.com/en/tools/bloch-equation-generator/

Sample Test Run:
----------------
To verify correct operation:
- Run the program in a browser.
- Create a simple 3-level system with 2 transitions and 1 decay.
- Confirm that the equations are displayed on screen and the download 
  buttons generate the corresponding .c files correctly.

Support and Contact:
--------------------
For questions or bug reports, please contact:
Dr. Marco P. M. de Souza
Federal University of Rondônia – UNIR
Campus Ji-Paraná, Brazil
marcopolo@unir.br
