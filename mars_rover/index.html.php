<?php 
  $level = 2;
  include "../../design/header.html"
?>

<div class="path">
  <a href="../index.html">projects</a> &gt; <a href="index.html">mars rover</a>
</div>

<div class="main">
  <div class="content">

<h1>mars rover</h1>
<div class="descr">computer graphics project</div>

<p>The goal of this project oriented course was to write a 3D interactive application. We programmed a
robot that navigates on a Mars like 3D landscape. The robot
has got an articulated arm allowing it to lift stones from the ground. There are several
cameras (outside view, robot view, free cam) and display modes (wireframe, flat shading, gouroud shading).</p>

<p>At first we wanted the robot to move in a very realistic way. We finally realized that this involved
writing a lot of extra code (physics engine that takes friction into account). So we ended up with something that looks
nice but is not always realistic.</p>

<p>We used backface culling in order to improve the display speed. This improves the wireframe view too,
since it removes some hidden lines.</p>

<p>The code is written in C and compiles under Windows, Solaris and Linux. In order to have portable code, we
used the OpenGL and GLUT libraries.</p>

<h2>keys</h2>
<p>The right mouse button is used to bring up a context menu (that is used
to change views or control modes).</p>
<p>W, S, A, D control the camera (up, down, left, right). X and Y control the zoom. When using the
robot view, F and R control the tilt. The free cam is controlled using the mouse.</p>
<p>The robot can be in two modes, vehicule or arm. In both cases the keys I, K, J, L are
used to control the up, down, left, right directions. When in arm mode, the space bar allows
the robot to pick and release stones.</p>
<p>T allows the view to be toggled between flat shading and wireframe.</p>

<h2>screenshots</h2>

<p>These images show how our world looks like when viewed as wireframe, flat shadding and gouraud shading. As you can
notice, the gouraud shading is the best, but requires more processing time (the light normal is interpolated across
each triangle).</p>

<p>The 3D landscape was generated using a random fractal algorithm known as square-diamond. One of the limitations of generating the landscape
with a simple algorithm like our's is that we don't have bridges and tunnels, which would have
really looked nice.</p>

<p>The parabolic antenna is defined as a triangle mesh. It's tickness is null, so we used a trick to
display it correctly when viewed from the back: we created a copy with the normals flipped. The normals for the
flat and gouraud shading were calculated using the gradient of the parabolic function.</p>

<p>We have some other special objects (volcano generated using the revolution (lathe) method, body of
the robot generated using extrusion).</p>

<p>The last image illustrates our robot picking up a stone. There are many other goodies in
our code, so you can download the exectuable or source code and enjoy our Mars rover project.</p>

<table width="100%"><tr><td width="50%" align="center"><a href="wireframe.png"><img src="wireframe_small.jpg" border="0"/></a></td>
<td width="50%" align="center"><a href="flat.png"><img src="flat_small.jpg" border="0"/></a></td></tr>
<tr><td align="center" class="descr">wireframe</td><td align="center" class="descr">flat shading</td></tr>

<tr><td align="center"><a href="gouraud.png"><img src="gouraud_small.jpg" border="0"/></a></td>
<td align="center"><a href="robot_view.png"><img src="robot_view_small.jpg" border="0"/></a></td>
<tr><td align="center" class="descr">gouraud shading</td><td align="center" class="descr">robot's view camera</td></tr>

<tr><td align="center"><a href="traces.png"><img src="traces_small.jpg" border="0"/></a></td>
<td align="center"><a href="antenna.png"><img src="antenna_small.jpg" border="0"/></a></td></tr>
<tr><td align="center" class="descr">robot with wheel traces</td><td align="center" class="descr">antenna</td></tr>

<tr><td align="center"><a href="robot.png"><img src="robot_small.jpg" border="0"/></a></td>
<td></td></tr>
<tr><td align="center" class="descr">robot picking up rock</td><td></td></tr>
</table>

<h2>executables and source code</h2>
<ul>
<li><a href="robot_src.zip">source archive</a></li>
<li><a href="robot_linux.zip">linux executable</a></li>
<li><a href="robot_win.zip">windows executable</a></li>
<li><a href="robot_sun.zip">solaris executable</a></li>
</ul>

 </div>

<?php include "../../design/footer.html" ?>

