<?php
class RipenerModel extends Query{
    public function __construct()
    {
        parent::__construct();
    }

    public function controlRipener($data){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, urlapiMongo2."/Control/");
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $res = curl_exec($ch);
        curl_close($ch);  
        return $res;
    }
}