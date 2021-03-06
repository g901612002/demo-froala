module.exports = function(ngModule) {
  ngModule.directive('voiceupload', [
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
        };

        $scope.handleFile = function(file){
          var rawdata,extIndex,fileName;
          var dfd = $q.defer();
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function (e) {
            extIndex = file.name.lastIndexOf('.');
            fileName = file.name.substr(extIndex+1, file.name.length);
            rawdata = e.target.result;
            $scope.$emit('loadingOpen');
            AUTHCODE.CURRENT = AUTHCODE.CAROOT;
            Upload
              .http({
                url:Constants.baseurl+ "voice/preview",
                method:'POST',
                data:{
                  "voice": rawdata,
                  "ext": fileName
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
                      "ext": fileName,
                      "raw":rawdata,
                      "path":res.voice,
                      "length":res.length
                    };
                    $log.debug("path",result.path);
                    file.result = result;
                    dfd.resolve(result);
                  }else{
                    dfd.reject();
                  }
                },1000);
                $scope.$emit('loadingClose');  
              })
              .error(function (response) {
                $log.debug("upload err",response);
                $scope.$emit('loadingClose');  
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
            if(_files.length>1){
              issuccess = false;
              toastr.error("一次最多上傳1張，請重新選擇");
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
            $scope.$emit('loadingClose');  
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
                $scope.$emit("finishvoiceupload",res);
              },
              function(){
                $scope.isuploading = false;
                toastr.error("語音上傳過程中發生失敗");
                $scope.$emit('loadingClose');  
              }
            );
          }
        };//End $scope.uploadFiles

      }; //End ctrl

      return {
        restrict: 'AEC',
        template: require("./voice-fileupload.html"),
        controllerAs: 'ctrl',
        transclude:true,
        scope:{
          channelpkey:"=",
          btnclass:"@",
          btntext:"@"
        },
        link: function($scope, element, attributes,controller) {
        },
        controller:ctrl
      };
  }]);
};
