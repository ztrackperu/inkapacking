<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo base_url; ?>Assets/css/navbar-1.css">
    <link rel="stylesheet" href="<?php echo base_url; ?>Assets/css/stylenav.css" />
    <link rel="stylesheet" href="<?php echo base_url; ?>Assets/css/main.css" />
    <link rel="stylesheet" href="<?php echo base_url; ?>Assets/css/select2.min.css"  />
    <link rel="stylesheet" href="<?php echo base_url; ?>Assets/css/fonts/remixicon.css" />
    <!--bootstrap icon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css">
    <!-- DataTables CSS CDN -->
    <link href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.11.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.dataTables.min.css">
    
    <link rel="icon" href="<?php echo base_url; ?>Assets/img/conf.png" type="image/x-icon">
    <title>PROYECTO BASE</title>
</head>
<body>
<div class="wrapper">
    <aside id="sidebar">
        <div class="d-flex">
            <button class="logo-btn" type="button">
                <a href="<?php echo base_url?>AdminPage">
                    <svg class="icon" width="30" height="30">
                        <use xlink:href="sprite.svg#oso_icon"></use>
                    </svg>
                </a>
            </button>
            <div class="sidebar-logo">
                <a href="<?php echo base_url?>AdminPage">ZGROUP</a>
                <button type="button" class="btn-close float-end toggle-btn2" aria-label="Close" id="close-mobile" style="background-color:white;"></button>
            </div>
        </div>
        <ul class="sidebar-nav">
            <li class="sidebar-item">
                <a href="<?php echo base_url?>AdminPage" class="sidebar-link">
                    <i class="ri-home-2-line"></i>
                    <span class="text-uppercase">HOME</span>
                </a>
            </li>
            <li class="sidebar-item">
                <a href="<?php echo base_url?>Comando" class="sidebar-link">
                    <i class="ri-speak-line"></i>
                    <span class="text-uppercase">Comandos</span>
                </a>
            </li>
           
        </ul>
    </aside>
    <div class="main">
        <nav class="navbar navbarLight navbar-expand-sm navbar-light d-flex justify-content-between ">
            <div class="d-flex justify-content-start">
                <button class="toggle-btn toggle-btnLight" type="button">
                    <i class="ri-align-justify"></i>
                </button>
            </div>
            <ul class="navbar-nav d-flex justify-content-end align-items-center navbarIcon">
                <li class="nav-item d-flex dropdown align-items-center p-1" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="<?php echo base_url?>Assets/img/user1.jpg" class="img-radius rounded-circle img-profile" width="30" height="30" alt="...">
                    <a class="nav-link" href="">
                        <div class="text-secondary"><?php echo  $_SESSION['usuario_ztrack']?></div>
                        <div style="font-size:12px;" class="text-secondary"></div>
                    </a>
                </li> 
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow bsb-zoomIn" aria-labelledby="profileDropdown">
                    <li><a class="dropdown-item" href="<?php echo base_url; ?>Usuarios/salir">Logout</a></li>
                </ul>
        </nav>
    
