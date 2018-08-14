<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Automobile Maintenance Tracker</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="css/mdb.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/style.css" rel="stylesheet">
</head>

<body class="black-skin">
    <?php include("view/main.php"); ?>
    
    <?php include("view/deleteOrderModal.html"); ?>
    <div data-bind="template: { name: 'order-delete-template', foreach: serviceOrders }"></div>
    
    <?php include("view/addOrderModal.html"); ?>
    
    <?php include("view/scripts.html"); ?>
</body>
</html>
