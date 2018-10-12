<?php 

class Test_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }
        public function new_test($data)
        {       
                 
                 //, $data['quetype'],$data['status'],$data['status']
                //   Predefind function don't think much
                $this->load->helper('url');
                $nameVal = $data['name'] ;
                $testid = mt_rand(100000, 999999) ; ;
                $status =  $data['status'] ;
                $test_type_id =  $data['test_type_idVal'] ;
                $sections = $data['sections'] ;
                //  Call proccedures 
                $sql="CALL `createTest`(?,?,?,?)" ;
                $query = $this->db->query($sql,array($nameVal,$testid,$status,$test_type_id));
                //  $query1 = $this->db->query("CALL `GetOptionByTrackid`($trackid)");
                //  $query2 =$this->db->query("CALL `createOptions`(456,'dfsd',0)");
                //  $getId=$query1->result_array() ;
                //  $getIdVal=$getId[0]['id'] ;
                foreach($sections as $key=>$data){
                         //$this->commission_one[$row['0']]= $row['1'];
                        //store values in db as jsonformat using json encode mathed 
                        $sections[$key]['questionids'] = json_encode($data['questionids']) ;
                        $sections[$key]['testid'] = $testid ;
                 }
                 //Create batch array insert
                $this->db->insert_batch('tbl_sections',$sections);
                //NO error handling assume everything fine
                //$commission_one=array();
                return [];
                //return $getId[0] ;
         }
                     public function users_list()
        {     
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `usersget`()");
                //NO error handling assume everything fine
                $commission_one=array();
               
              //   $commission_one[1]['options']=1;
             return $commission_one;
        }



         public function get_result_test_rows($useId,$testId){

               // $queryddd = $this->db->select("SELECT * FROM tbl_test_result where userid=$useId && testId = $testId");

               //      $commission_one123=array();
               //      foreach($queryddd->result_array() as $key=>$data){
                            
               //            $commission_one[] = $data ;
               //      }
               //       $query->next_result(); 
               //       $query->free_result();
               //      //$color === NULL ? 'color IS NOT NULL' : 'color =', $color
               //      return $commission_one ;

                // $query = $this->db->get('tbl_test_result');
                //          $this->db->where( array("userid"=>$useId ,"testId"=>$testId ));
                //          //$this->db->where('testId', $testId) ;
                //          print_r($query->num_rows() ) ;
                //          exit;     

              // if(is_object($query)){
                            // if($query->num_rows()) // if the affected number of rows is one
                            // {
                            //     return true;
                            // }else{
                            //     return false;
                            // }
                    // }else{  
                    //      return false ;
                    // }

                    $query = $this->db->query("SELECT * from tbl_test_result WHERE  userid=$useId AND testId = $testId ");
                    //NO error handling assume everything fine

                          //NO error handling assume everything fine
                    $commission_one=array();
                    foreach($query->result_array() as $key=>$data){ 
                          $commission_one[] = $data ;
                    }
                     $query->next_result(); 
                     $query->free_result();
                  // $commission_one[1]['options']=1;
                      return $commission_one;
                     
            
         }

         public function review_awa($data,$text)
         {       
                    //,$data['quetype'],$data['status'],$data['status']
                    //Predefind function don't think much
                    $this->load->helper('url');
                    $useId = $data['useId'] ;
                    $testId = $data['testId'] ;
                    $phoneNo = $data['phoneNo'] ;
                    $jsonData = json_encode($data["toalObj"]);
                    $sql="CALL `updateawareview`($useId,$testId)" ;
                    // echo  $sql ;
                    // exit;
                    $query = $this->db->query($sql,array($useId,$testId));
                    // print_r( $query);
                    // exit;
                    $myfile = file_put_contents('uploads/'.$useId. $testId.'.json',  $jsonData);
                   
                    $sms=$this->sms_integration_post($phoneNo);
                    return [];
                    //return $getId[0] ;
            }



     public function sms_integration_post($num){
      
          
          $user_id    ='texass'; // Your Username
          $pwd        ='texas@321';    // Your Password
          $sender_id  = 'TEXASS';  // Add 6 char sender id viz: HDFCBK        
          $mobile_num =$num;  // Mobile Number, You can add comma separated mobile number
          $message = "Your AWA section evalution completed, check in portal.";
          // Sending with PHP CURL
          $ch=curl_init();        
          curl_setopt($ch, CURLOPT_URL, "http://tra.bulksmshyderabad.co.in/websms/sendsms.aspx?userid=".$user_id."&password=".$pwd."&sender=".$sender_id."&mobileno=".urlencode($mobile_num)."&msg=".urlencode($message));
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_exec($ch);
          //Print error if any
          if(curl_errno($ch))
          {
              //echo 'error:' . curl_error($ch);
          }
          curl_close($ch);
     }



         public function save_test($data,$text)
             {       
                     //,$data['quetype'],$data['status'],$data['status']
                    //Predefind function don't think much
                    $this->load->helper('url');
                    $useId = $data['useId'] ;
                    $testId = $data['testId'] ;
                    $trackid = mt_rand(100000, 999999) ; 
                    //json_encode($data['toalObj'] )
                    $jsonData = json_encode($data["toalObj"]);
                    $myfile = file_put_contents('uploads/'.$useId. $testId.'.json',  $jsonData);
                    $toalObj = 'uploads/'.$useId. $testId.'.json' ;
                    $sectionWiseResult = $data['sectionWiseResult'] ;
                    $resultData = json_encode($data['resultData'],true) ;
                    $testType = $data['testType'] ;
                    $awsstatus = $data['awsstatus'] ;
                    $fre=$this->get_result_test_rows($useId,$testId);
                     //NO error handling assume everything fine 
                     if($text == 'update'){
                        //UPdate row
                         // //Call proccedures 
                        $sql="CALL `updateTest`(?,?,?,?,?,?,?)" ;
                        $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj,$resultData,$testType,$awsstatus));
                     }else{
                        //Insert row
                         // //Call proccedures 
                        $sql="CALL `saveTest`(?,?,?,?,?,?,?)" ;

                        $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj,$resultData,$testType,$awsstatus));

                     }

                    // //Call proccedures 
                    // $sql="CALL `saveTest`(?,?,?,?,?,?)" ;
                    // $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj, $resultData,$testType));
                    // $sections=[] ;
                    // foreach($sectionWiseResult['sections'] as $key=>$data){
                    //         $sections[$key]['trackid'] =$trackid;
                    //         $sections[$key]['section'] =$key+1;
                    //         $sections[$key]['total_quations'] = count($data);
                    //         $sections[$key]['correct_ans'] = $data['result'];
                    //  }
                    // //Create batch array insert
                    // $this->db->insert_batch('tbl_result_sections',$sections);
                    //NO error handling assume everything fine


                    //$commission_one=array();
                    return [];
                    //return $getId[0] ;
            }

                     public function resume_test($data)
                    {       
          
                
                    //Predefind function don't think much
                    $this->load->helper('url');
                    $useId = $data['useId'] ;
                    $testId = $data['testId'] ;
                    $trackid = mt_rand(100000, 999999) ; 
                    //json_encode($data['toalObj'] )
                    $jsonData = json_encode($data["toalObj"]);
                    $myfile = file_put_contents('uploads/'.$useId. $testId.'.json',  $jsonData);
                    $toalObj = 'uploads/'.$useId. $testId.'.json' ;
      

                  
                    //Call proccedures 
                    $sql="CALL `createtestresume`(?,?,?,?)" ;
                    $query = $this->db->query($sql,array($useId,$testId,$trackid,$toalObj));
                   
                    //$commission_one=array();
                    return [];
                    //return $getId[0] ;
            }
            public function question_list()
            {       
                    //Predefind function don't think much
                    //$this->load->helper('url');
                    //Call proccedures 
                    $query = $this->db->query("CALL `getQuestionsList`()");
                    //NO error handling assume everything fine
                    $commission_one=array();
                    foreach($query->result_array()as $key=>$data){
                            $data['options'] =  $this->optionById_list($data['trackid']) ;
                             $commission_one[] = $data ;
                    }
                  //   $commission_one[1]['options']=1;
                 return $commission_one;
            }

         public function test_by_id($id)
            {       
                    //Predefind function don't think much
                    //$this->load->helper('url');
                    //Call proccedures 
                    $query = $this->db->query("CALL `testBytrackid`($id)");
                    //NO error handling assume everything fine
                    $commission_one=array();
                    foreach($query->result_array()as $key=>$data){
                            $data['sections'] =  $this->sectionById_list($id) ;
                            $commission_one[] = $data ;
                    }
                    //$query->free_result();
                    $commission_one[0]['questions'] =[] ;
                    $tempArry = array() ;
                    foreach($commission_one[0]['sections'] as $key=>$data){
                      $commission_one[0]['sections'][$key]->questionids = json_decode($data->questionids);
                       // $commission_one[0]['sections'][$key]['questionids'] =  $data->questionids ;
                       $tempArry[] = $data->questionids;
                    }
                   $commission_one[0]['questions'] =  $this->question_By_in_list(array_merge(...$tempArry) ) ;
                  //   $commission_one[1]['options']=1;
                 return $commission_one[0];
            }
             public function question_By_in_list1($userid,$obj)
            {    
                
                    $comma_separated = implode(",", $obj);
                    // echo "SELECT * from  practise_result_data1 where userid = $userid and  trackid =  $comma_separated" ;
                    $query1 = $this->db->query("SELECT * from  practise_result_data1 where userid = $userid and  trackid = $comma_separated");

                    if($query1->result_array()){
                         $data =array() ;
                        // $data[0] =$query1->result_array() ;
                         //$data =$data['totalobj'] ;
                         $temp =[];
                       foreach($query1->result_array() as $key=>$data){
                             $temp = json_decode($data['totalobj'],true) ;
                        }
                         $data[0]['qua'] = $temp ;
                         $data[0]['is_attend'] = true ;
                         return $data[0] ;                       
                    }else{
                        $query = $this->db->query("SELECT * from tbl_question_new WHERE trackid IN ( $comma_separated)");
                        //NO error handling assume everything fine
                        $commission_one=array();
                        foreach($query->result_array() as $key=>$data){
                              $data['is_attend'] = false ; 
                              $data['options'] =  $this->optionById_list($data['trackid']) ;
                              $commission_one[] = $data ;
                        }
                        

                         $query->next_result(); 
                         $query->free_result();
                      // $commission_one[1]['options']=1;
                        return $commission_one;
                    }


                    



            }
          public function question_By_in_list($obj)
            {    
                
                    $comma_separated = implode(",", $obj);
                    $query = $this->db->query("SELECT * from tbl_question_new WHERE trackid IN ( $comma_separated)");
                    //NO error handling assume everything fine
                    $commission_one=array();
                    foreach($query->result_array() as $key=>$data){
                          $data['options'] =  $this->optionById_list($data['trackid']) ;
                          $commission_one[] = $data ;
                    }
                     $query->next_result(); 
                     $query->free_result();
                  // $commission_one[1]['options']=1;
                 return $commission_one;
            }
           public function optionById_list($id)
            {       
                 $stored_procedure= "CALL GetOptionByTrackid($id)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 return $result;
            }
          public function test_list()
            {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `allTestList`()");
                //NO error handling assume everything fine
                // foreach($query->result_array()as $key=>$data){
                //         $data['options'] =  $this->optionById_list($data['trackid']) ;
                //         $commission_one[] = $data ;
                // }
               //$commission_one[1]['options']=1;
               return $query->result_array();
            }
           public function test_list_userId($userid)
            {       
                    //Predefind function don't think much
                    //$this->load->helper('url');
                    //Call proccedures 
                    $query = $this->db->query("CALL `allTestList`()");
                    //NO error handling assume everything fine
                    $commission_one=array();
                    foreach($query->result_array()as $key=>$data){
                            $data['is_attend_test'] =  $this->checkIsAttendExam($userid,$data['testid'])  ;
                            //$data['is_test_resume'] =  $this->checkIsResumeExam($userid,$data['testid'])  ;
                            $commission_one[] = $data ;
                    }
                  //   $commission_one[1]['options']=1;
                 return $commission_one ;
            }
            public function checkIsAttendExam($userid,$testid)
            {       
                // echo "CALL checkIdInTest($userid,$testid)" ;
                // exit ;
                 $stored_procedure= "CALL checkIdInTest($userid,$testid)";
                 $query=$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 if($result){
                    return $result[0];
                 }else{
                    return "" ;
                 }
            }
               public function checkIsResumeExam($userid,$testid)
            {       

               
                 $stored_procedure= "CALL checkIsResumeExam($userid,$testid)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 if($result){
                    return true;
                 }else{
                    return false ;
                 }
            }

            public function test_review_id($userid,$testid)
            {       
                 $stored_procedure= "CALL checkIdInTest($userid,$testid)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result_array() ;
                 $query->next_result(); 
                 $query->free_result();
                 return   json_decode($result[0]['result_data'])   ;  
            }
            public function sectionById_list($id)
            {       
                 $stored_procedure= "CALL sectionsByid($id)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 
                 return $result;
            }

            public function awscmsque_list($branch)

             {  
                $query = $this->db->query("CALL `getawscms`('$branch')");
        
               return $query->result_array();
             }
            public function awsuique_list($id)
             {       
                $query = $this->db->query("CALL `getawsui`($id)");
        
               return $query->result_array();
             }
            // public function awsuique_list($id)
            //  {       
            //      $stored_procedure= "CALL getawscms($id)";
            //      $query=@$this->db->query($stored_procedure,array());
            //      $result = $query->result();
            //      $query->next_result(); 
            //      $query->free_result();
                 
            //      return $result;
            // }
            public function row_delete($id){
               $res=$this->db->delete('tbl_question_new', array('trackid' => $id)); 
               $res1=$this->db->delete('tbl_options', array('question_id' => $id)); 
               if($res){
                   $result= array("error"=>array("name"=> "Error",
                                  "status"=> 200,
                                  "message"=> "success",
                                  "statusCode"=> 200,
                                  "code"=> "success")) ;
                          return $result ;
                  }else{
                    $result= array("error"=>array("name"=> "Error",
                                          "status"=> 401,
                                          "message"=> "Error",
                                          "statusCode"=> 401,
                                          "code"=> "delete_FAILED")) ;
                         return $result ;
                  }
          }

}

?>
