<?php include "Views/templates/navbar.php"; ?>
<link rel="stylesheet" href="<?php echo base_url; ?>Assets/css/swiper-bundle.min.css" />
<style>
/* -----Root CSS Variable------ */
*,
::after,
::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
/* -----CSS Global----- */
body {
    font-family: 'Poppins', sans-serif;
    /*background-color: #343434; */
}
/* -----Wrapper------- */
.wrapper {
    max-width: 2570px;
    margin: 0 1px;
    padding: 0 1px;
}
/* ------- Card Slider ---------- */
#cards {
    padding: 45px 0;
}

.swiper {
    padding-top: 30px;
}
.icono{
    fill:red;
}

.card-content {
    text-align: center;
    position: relative;
    cursor: pointer;
}

.card-body {
    margin: 0 2px;
    padding: 0 2px;
}
.card-content img {
    border-radius: 0.5rem;
}
/* ----- Swiper arrow and pagination --------- */
.arrow {
    display: flex;
    align-items: center;
    padding-top: 20px;
}
.prevArrowBtn,
.nextArrowBtn {
    z-index: 1000;
    border: 2px solid #DDD;
    color: #FFF;
    background-color: #343434;
    font-size: .80rem;
    text-align: center;
    cursor: pointer;
    display: block;
    width: 2.75rem;
    height: 2.75rem;
    line-height: 2.625rem;
}
.nextArrowBtn {
    margin-left: 10px;
}
/* ---- Styling swiper bullets ----- */
.swiper-pagination-bullets.swiper-pagination-horizontal {
    width: 60%;
    display: flex;
    position: static;
    margin: 0 auto;
}
.swiper-pagination-bullet {
    width: 100%;
    height: 5px;
    border-radius: 0;
}
.swiper-pagination-bullet-active {
    background-image: linear-gradient(162.41deg, #43baff 1.77%, #7141b1 92.78%);
}

.swiper-pagination-bullet:hover {
    background-image: linear-gradient(162.41deg, #43baff 1.77%, #7141b1 92.78%);
    opacity: 1;
    outline: none;
}
</style>
<div class="px-2 py-2">
    <div class="col-12 col-lg-12">
        
        <div class="row">
            <div class="card border-0" style='padding-right:5px ; padding-left:5px;'>
                <div class="card-body">
                    <section id="cards" style='padding-top:15px ;' >
                        <div class="wrapper">
                            <!-- Slider main container -->
                            <div class="swiper" style='padding-top:15px ;' >
                                <div class="card-slider">                     
                                    <!-- Additional required wrapper -->
                                    <div  id="contenidoPrincipal" class="swiper-wrapper">                            
                                        <!-- Slides -->
                                        <!--<div id="carruselExtra"></div>-->
                                    </div>
                                    <!-- Swiper wrapper ends -->
                                    <div class="arrow">
                                        <div class="prevArrowBtn"> 
                                            Pass
                                        </div>
                                        <div class="nextArrowBtn">
                                            Next
                                        </div>
                                        <ul class="swiper-pagination"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</div>
<!--modal-->
<div class="modal fade" id="modalReporte" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Report</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="contenido">
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalFinalizar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">End the process</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="contenidoFinalizar">
            </div>
        </div>
    </div>
</div>

<script src="<?php echo base_url; ?>Assets/js/swiper-bundle.min.js"></script>
<script>
    // Initialize swiper.js for project slider
const swiper = new Swiper(".card-slider", {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 3,
    loop: true,
    navigation: {
      nextEl: ".nextArrowBtn",
      prevEl: ".prevArrowBtn",
    },
    pagination: {
      el: ".swiper-pagination",
      renderBullet: function (index, className) {
        return '<li class="' + className + '"></li>';
      },
      clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 576px
      600: {
        slidesPerView: 1,
      },
      1240: {
        slidesPerView: 1,
        spaceBetween: 1,
      },
      // when window width is >= 768px
      1900: {
        slidesPerView: 1,
        spaceBetween: 1,
      },
    },
  });
</script>
<?php include "Views/templates/footer.php"; ?>

