<?php
error_reporting(0);

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Queoption extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['rows_get']['limit'] = 500000; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100000; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 500000; // 50 requests per hour per user/key
    }

 
 
    public function create_que_post()
    {
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
            $this->load->model('Queoption_model');
            $test=$this->Queoption_model->new_que($input_data);
             try { 
                if(empty($test)) {
                     $finall=array(array("response"=> "success" , "mesg"=> "") ) ;
                     $this->set_response( $finall, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                }else{
                     $finall=array(array("response"=> "fail" , "mesg" => "Check entered values") );
                     $this->set_response( $finall, REST_Controller::HTTP_OK);

                }
                }catch(Exception $e){
                //alert the user.
                     var_dump($e->getMessage());
                }
    }


  public function que_list_get()
    {
            $input_data = json_decode(trim(file_get_contents('php://input')), true);
            $this->load->model('Queoption_model');
            $commission_one=array("questions" => $this->Queoption_model->question_list()) ;

            try { 
                if(empty($commission_one)) {
                    $this->set_response([], REST_Controller::HTTP_OK);
                }else{
                    $tempArray=array() ;
                      foreach($commission_one['questions'] as $key=>$data){
                            if($data['question_type_id'] == 3){
                                 $tempDataOpt=$this->quetionPartinas($data, $data['noofblanks']) ;
                                 $tempArray[] = $tempDataOpt ;
                            }else{
                                 $tempArray[] = $data ;
                            }
                        }
                      $commission_one['questions'] = $tempArray ;
                    $this->set_response($commission_one, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                }
            }catch(Exception $e){
            //alert the user.
                 var_dump($e->getMessage());
            }
    }
    public function quetionPartinas($data,$noblnk){
    
       
         $options =$data['options'] ;
         $another=array();
         $option_div= sizeof($options)/ $noblnk ;
         $p=-1;
            for($i=0;$i<=$noblnk-1 ;$i++){    // $i<= noofblocks-1;
               $another[$i]=array();  
                $kl=1;
                for($j=0;$j<=sizeof($options);$j++){       
                    $j=$p+1;
                    array_push($another[$i], $options[$j]);        
                    if($kl == $option_div){     // $kl== noofblocks;
                        $p=$j;       
                        break;
                    }       
                     $p=$j;   
                    $kl++;
                }
            }
           $data['options']= $another ;
        return $data  ;
    }

 
   
     public function quotion_delete()
        {
            $id=(int)$this->uri->segment('4');
            // Users from a data store e.g. database
             $this->load->model('Queoption_model');
            $users= $this->Queoption_model->row_delete($id) ;
            try { 
                if(empty($users)) {
                    $this->set_response([], REST_Controller::HTTP_OK);
                }else{
                    $this->set_response($users, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                }
            }catch(Exception $e){
            //alert the user.
                 var_dump($e->getMessage());
            }
            
        }

}
