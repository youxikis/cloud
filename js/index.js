
var app=angular.module('reminder',[]);
app.controller('mainCtrl',['$scope',function($scope){
	
	 $scope.cu=0;
	 $scope.colors=['purple','green','blue','yellow','brown','red','orange']
	 
	 //将$scope.lists存储到本地
	 if(localStorage.s){
	 	console.log(4)
	 	$scope.lists=JSON.parse(localStorage.s);
	 }else{
	 	console.log(9)
	 	$scope.lists=[];
	 }
	 //存储Id
	  $scope.maxId=function(){
	 	var max=-Infinity;
	 	var v=$scope.lists;
	 	for(var i=0;i<v.length;i++){
	 		if(v[i].id>max){
	 			max=v[i].id;
	 		}
	 	}
	 	return (max===-Infinity)?1000:max;
	 	
	 }
	  //添加新列表 
	 $scope.addList=function(){
	 	var index=$scope.lists.length%7;
		var v={
				id:$scope.maxId()+1,
				name:'新列表 '+$scope.lists.length,
				theme:$scope.colors[index],
				todos:[]
			}
		$scope.lists.push(v)
	}
	 //添加新项目
	 $scope.addItem=function(){
	 	var i={
	 			name:'',
	 			state:0
	 		}
	  	$scope.lists[$scope.cu].todos.push(i);
	 }
	 
	
	//清除已完成
	$scope.delF=function(){
		var newarr=[];
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if(v.state===0){
				newarr.push(v);
			}
		})
		$scope.lists[$scope.cu].todos=newarr;
	}
	//已完成个数
	$scope.fNum=function(){
		var n=0;
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if(v.state===1){
				n++
			}
		})
		return n;
	}
	
	//清除单个项目
	$scope.delSingle=function(){
		
	}
	//本地存储函数
	$scope.saveLocal=function(){
		localStorage.s=JSON.stringify($scope.lists);
	}
	$scope.saveLocal2=function(){
		localStorage.i=JSON.stringify($scope.items);
	}
	
}])

app.directive('ngActive',[function(){
	return {
		restrict:'A',
		replace: true,
		transclude:true,
		template: '<ul class="reminders"><div ng-transclude></div></ul>',
		link:function($scope,v){
			
			$(document).on('keyup',':input',false);
			$(".reminders").on('click','li',function(){
				$(".reminders").find("li").find(".rowLine").css("left",'44px')
				$(".reminders").find("li").removeClass("bacActive");
				$(this).addClass("bacActive");
				$(".reminders .bacActive").find(".rowLine").css("left",0);
				$(".jihua").removeClass("bacActive");
				//存储当前index到cu
				var that=this;
				$scope.$apply(function(){
				 	$scope.cu=$(that).index();
				})
			})
			
			//已计划的点击效果
			$(".jihua").on('click',function(){
				$(".reminders").find("li").removeClass("bacActive");
				$(this).addClass("bacActive");
			})
			//按del键删除
			$(document).on("keyup",function(e){
				
				if(e.keyCode===46||e.keyCode===8){
					console.log(1)
//					$(".reminders").find(".bacActive").remove();
					var index2=$(".reminders .bacActive").index();
					$scope.$apply(function(){
						if(index2<0){
							return
						}
						$scope.lists.splice(index2,1);
					})
				}
				$scope.saveLocal();
			})

			// 
				console.log($scope.lists.length)
				if($scope.lists.length==0){
					console.log($(".finishNum")[0])
					$(".finishNum")[0].innerHTML="0项"
				}
				else{
					$(".finishNum")[0].innerHTML=$scope.fNum+"项"
				}
			
		}
	}
	

}])
/***********************弹框*************************************/

app.directive('ngT',[function(){
	return {
		restrict:'A',
		replace: true,
		transclude:true,
		template:'<div class="xuan dis"><div ng-transclude></div></div>',
		link:function($scope,el){
			$(el).on('click',false);
			$(".xuanx").click(function(){
				$(el).toggleClass("dis");
				return false;
			})
			$(document).click(function(){
				$(el).addClass("dis");
			})
			//颜色圈圈
			$(".colorSel").on("click","li",function(){
				$(".colorSel li .two").removeClass("block");
				$(this).find(".two").addClass("block")
				
			})
			//弹框中的删除
			$('.xia .del').on('click',function(){
			    var index2=$(".reminders .bacActive").index();
				$scope.$apply(function(){
					if(index2<0){
						return
					}
					$scope.lists.splice(index2,1);
				})
				$scope.saveLocal();
			})
			//弹框中的取消
			$('.xia .quxiao').on('click',function(){
				$('.xuan').toggleClass("dis");
			})
			//弹框中的完成
			$('.xia .wanc').on('click',function(){
				$('.xuan').addClass("dis");
			})
			
			//
			$(".fList").on("click","li",function(){
				$(".fList li").removeClass("borderI")
				if($(this).index()==($(".fList li").length-1)){
					return
				}
				$(this).addClass("borderI");
//				$(this).find(".imgk").addClass("move")
				
			})
		/*	console.log($(".fList li"))
			$(".flist ").on("click",'li .imgk',function(){
				
				$(this).addClass("move")
			})*/
			
			
//			$("#add").on("click",function(){
//				var index=$(".fList li").length-2;
//				console.log($(".fList li").eq(index))
//				$(".fList li").eq(index).toggleClass("aa");
//			})
//			
			
		}
	}
}])
/*******************************************************************/


/***************************************************************/