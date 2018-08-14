<!-- Navbar -->
<nav class="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar">
    <div class="container">

        <!-- Brand -->
        <a class="navbar-brand" href="">
        <strong>Harveys Autobody Repairs</strong>
        </a>

        <!-- Collapse -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <!-- Left -->
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#trackerSection">Tracker</a>
            </li>
        </ul>

        <!-- Right -->
        <ul class="navbar-nav nav-flex-icons">
            <li class="nav-item">
            <a href="https://www.facebook.com/" class="nav-link" target="_blank">
                <i class="fa fa-facebook"></i>
            </a>
            </li>
            <li class="nav-item">
            <a href="https://twitter.com/" class="nav-link" target="_blank">
                <i class="fa fa-twitter"></i>
            </a>
            </li>
        </ul>

        </div>

    </div>
</nav>
<!-- Navbar -->

<!-- Full Page Intro -->
<div class="view full-page-intro rgba-black-bg" style="background-image: url('img/bg.png'); background-repeat: no-repeat; background-size: cover;">
    <!-- Mask & flexbox options-->
    <div class="mask rgba-black-dark d-flex justify-content-center align-items-center">

        <!-- Content -->
        <div class="container">

        <div class="row smooth-scroll">
            <div class="col-md-12 white-text text-center">
                <div class="wow fadeInDown animated" data-wow-delay="0.2s" style="visibility: visible; animation-name: fadeInDown; animation-delay: 0.2s;">
                    <h2 class="display-3 font-weight-bold text-uppercase mb-2 spacing rgba-white-slight px-4 py-3">
                        <strong>Harveys Autobody Repairs</strong>
                    </h2>

                    <h4 class="subtext-header mt-4 mb-5">Like it never happened</h4>
                </div>
                <a href="#trackerSection" data-offset="100" class="btn btn-white btn-rounded font-weight-bold dark-grey-text wow fadeInUp waves-effect waves-light animated" data-wow-delay="0.2s" style="visibility: visible; animation-name: fadeInUp; animation-delay: 0.2s;">Track Orders</a>
            </div>
        </div>

        </div>
        <!-- Content -->

    </div>
    <!-- Mask & flexbox options-->
</div>
<!-- Full Page Intro -->

<!--Main layout-->
<main>
    <div class="container">
        <h1 class="mt-5 text-center">Automobile Maintenance Tracker</h1>
        
        <!--Section: Main info-->
        <section class="mt-5 wow fadeIn" id="trackerSection">
            <?php include("view/tracker.html"); ?>
        </section>
        <!--Section: Main info-->
    </div>
    </main>
    <!--Main layout-->

    <!--Footer-->
    <footer class="page-footer text-center font-small mt-4 wow fadeIn">
    <!-- Social icons -->
    <div class="p-4">
        <a href="https://www.facebook.com/" target="_blank">
        <i class="fa fa-facebook mr-3"></i>
        </a>

        <a href="https://twitter.com/" target="_blank">
        <i class="fa fa-twitter mr-3"></i>
        </a>

        <a href="" target="_blank">
        <i class="fa fa-youtube mr-3"></i>
        </a>

        <a href="">
        <i class="fa fa-google-plus mr-3"></i>
        </a>

        <a href="">
        <i class="fa fa-dribbble mr-3"></i>
        </a>

        <a href="">
        <i class="fa fa-pinterest mr-3"></i>
        </a>

        <a href="">
        <i class="fa fa-github mr-3"></i>
        </a>

        <a href="">
        <i class="fa fa-codepen mr-3"></i>
        </a>
    </div>
    <!-- Social icons -->

    <!--Copyright-->
    <div class="footer-copyright py-3">
        © 2018 Copyright:
        <a href=""> MargeshPatel.ca </a>
    </div>
    <!--/.Copyright-->

</footer>
<!--/.Footer-->