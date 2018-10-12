
<?php 
error_reporting(1);
class  PractCategory_model extends CI_Model {

        // public $title;
        // public $content;
        // public $date;
       
        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }

     
        public function new_practcategory($data)

        {       

                //,$data['quetype'],$data['status'],$data['status']
               //Predefind function don't think much
                $this->load->helper('url');
                 $title = $data['titleVal'] ;
              
                 $trackid = mt_rand(100000, 999999) ;
                $testid = $data['testidVal'] ;
                $category = $data['categoryVal'] ;
                // $lessonname = $data['lessonnameVal'] ;
                // $lessontestid = $data['lessontestidVal'] ;
                $status = $data['status'] ;

                // $questionid=$data['questionid'];
                 // $subcat = $data['subcat'] ;
               
                   // $sql= "CALL `createQuestion`('$nameVal','$quetype','$status','$trackid','$noblk')" ;
                $sql= "CALL `createpractcategory`(?,?,?,?,?)" ;
                              //  Call proccedures 
                $query = $this->db->query($sql, array($title,$trackid,$testid,$category,$status) );
                // print_r($testid);
                // exit;
               
                //  $query1 = $this->db->query("CALL `GetOptionByTrackid`($trackid)");
                //  $query2 =$this->db->query("CALL `createsubcat`(456,'dfsd',0)");
                //  $getId=$query1->result_array() ;
                // //  $getIdVal=$getId[0]['id'] ;
                //    foreach($sections as $key=>$data){
                //          //$this->commission_one[$row['0']]= $row['1'];
                //         //store values in db as jsonformat using json encode mathed 
                //         $sections[$key]['questionids'] = json_encode($data['questionids']) ;
                //         $sections[$key]['testid'] = $testid ;
                //  }
                //  //Create batch array insert
                // $this->db->insert_batch('tbl_sections',$sections);
                //NO error handling assume everything fine
                //$commission_one=array();
                return [];
                //return $getId[0] ;

        }   
      // public function practisecat_list()
      //  {       
      //           //Predefind function don't think much
      //           //$this->load->helper('url');
      //           //Call proccedures 
      //           $query = $this->db->query("CALL `getpractisecat`()");
      //           //NO error handling assume everything fine
      //           // foreach($query->result_array()as $key=>$data){
      //           //         $data['options'] =  $this->optionById_list($data['trackid']) ;
      //           //         $commission_one[] = $data ;
      //           // }
      //          //$commission_one[1]['options']=1;
      //          return $query->result_array();
      //       }
        

             public function practisecat_list()
        {       
                //Predefind function don't think much
                //$this->load->helper('url');
                //Call proccedures 
                $query = $this->db->query("CALL `getpractisecat`()");
                //NO error handling assume everything fine
                $commission_one=array();
                foreach($query->result_array()as $key=>$data){
                        $data['subcat'] =  $this->practsubcatById_list($data['trackid']) ;
                              
                         $commission_one[] = $data ;

                }

              //   $commission_one[1]['options']=1;
             return $commission_one;
        }


            public function practsubcatById_list($id)
            {       
                 $stored_procedure= "CALL   GetpractSubcatByTrackid($id)";
                 $query=@$this->db->query($stored_procedure,array());
                 $result = $query->result();
                 $query->next_result(); 
                 $query->free_result();
                 
                 return $result;
            }
            //  public function questionids($id)
            // {       
            //      $stored_procedure= "CALL   getpractquestionids($id)";
            //      $query=@$this->db->query($stored_procedure,array());
            //      $result = $query->result();
            //      $query->next_result(); 
            //      $query->free_result();
                 
            //      return $query;
            // }


            public function questionids($id)
            {       
             
                    //Predefind function don't think much
                    //$this->load->helper('url');
                    //Call proccedures 
                    $query = $this->db->query("CALL `getpractquestionids`($id)");
                    //NO error handling assume everything fine
                    // $commission_one=array();
                    // foreach($query->result_array()as $key=>$data){
                    //         $data['sections'] =  $this->sectionById_list($id) ;
                    //         $commission_one[] = $data ;
                    // }
                    //$query->free_result();

                    $commission_one[0]['questions'] =[] ;
                    $tempArry = array() ;
                    foreach($commission_one[0]['sections'] as $key=>$data){
                      $commission_one[0]['sections'][$key]->questionids = json_decode($data->questionids);
                       // $commission_one[0]['sections'][$key]['questionids'] =  $data->questionids ;
                       $tempArry[] = $data->questionids;
                    }
                  //  $commission_one[0]['questions'] =  $this->question_By_in_list(array_merge(...$tempArry) ) ;
                  // //   $commission_one[1]['options']=1;
                 return $commission_one[0];
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
