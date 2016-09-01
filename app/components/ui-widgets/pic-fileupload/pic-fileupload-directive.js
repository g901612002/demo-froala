module.exports = function(ngModule) {
  ngModule.directive('picupload', [
  "$log",
  "Upload",
  "$timeout",
  "toastr",
  "$q",
  "Constants",
  "AUTHCODE",
  "Util",
  function($log,Upload,$timeout,toastr,$q,Constants,AUTHCODE,Util) {

      var ctrl = function($scope){
        var self = this;

        $scope.init = function(){
          $scope.isuploading = false;
          $scope.filelimit = 5 * 1024 * 1024;
          $log.debug("$scope.showtransclude",$scope.showtransclude);
          $scope.showtransclude = $scope.showtransclude || false;
        };

        $scope.handleFile = function(file){
          var dfd = $q.defer();
          var grouppkey = ($scope.grouppkey) ? $scope.grouppkey : "0";
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function (e) {
            AUTHCODE.CURRENT = AUTHCODE.CAROOT;
            Upload
              .http({
                url:Constants.baseurl+ "images",
                method:'POST',
                data:{
                  "channelpkey": $scope.channelpkey,
                  "grouppkey":grouppkey,
                  "name":file.name,
                  "photo": e.target.result
                }
              })
              .progress(function (evt){
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              })
              .success(function (res) {
                var result = {};
                $timeout(function () {
                  if (res.returncode == Constants.returncode.success) {
                    result = {
                      "path":res.photo,
                      "pkey":res.pkey
                    };
                    file.result = result;
                    dfd.resolve(result);
                  }else{
                    dfd.reject();
                  }
                },1000);
              })
              .error(function (response) {
                $log.debug("upload err",response);
                dfd.reject();
              });
          };
          return dfd.promise;
        }; //End $scope.handleFile

        $scope.uploadFiles = function(_files) {
          var promises = [];
          var issuccess = false;
          var namlenerr = false;
          var sizeerr = false;
          var errmsg = "";

          if(_files){
            if(_files.length>5){
              issuccess = false;
              toastr.error("一次最多上傳5張，請重新選擇");
            }else{

              namlenerr = _.every(_files,function(_file){
                return _file.name.length > 20;
              });
              if(namlenerr){
                issuccess = false;
                errmsg = errmsg + "檔名超過20字元，";
              }

              sizeerr = _.every(_files,function(_file){
                return _file.size > $scope.filelimit;
              });
              if(sizeerr){
                issuccess = false;
                errmsg = errmsg + "檔案大小超過5MB，";
              }

              if(namlenerr || sizeerr){
                issuccess = false;
                errmsg = errmsg + "請重新選擇";
                toastr.error(errmsg);
              }else{
                issuccess = true;
              }
            }
          }

          if(issuccess){
            $scope.isuploading = true;
            $scope.files = _files;
            angular.forEach(_files, function(_file) {
              var promise = $scope.handleFile(_file);
              promises.push(promise);
            });
            $q.all(promises).then(
              function(res){
                $scope.isuploading = false;
                $scope.$emit("finishpicupload",res);
              },
              function(){
                $scope.isuploading = false;
                toastr.error("有些圖片上傳過程中發生失敗，可能無法顯示");
              }
            );
          }
        };//End $scope.uploadFiles

      }; //End ctrl

      return {
        restrict: 'AEC',
        template: require("./pic-fileupload.html"),
        controllerAs: 'ctrl',
        transclude:true,
        scope:{
          channelpkey:"=",
          grouppkey:"=",
          showtransclude:"=?",
          btnclass:"@",
        },
        link: function($scope, element, attributes,controller) {
        },
        controller:ctrl
      };
  }]);
};
