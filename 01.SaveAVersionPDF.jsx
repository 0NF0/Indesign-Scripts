﻿var doc = app.activeDocument;var myDialog = app.dialogs.add({name:"Simple User Interface Example Script",canCancel:true});myFileName = doc.name;//If the file name contains the extension ".indd", remove itif(myFileName.indexOf(".indd")!=-1){var myRegularExpression = /.indd/gimyFileName = myFileName.replace(myRegularExpression, "");}with(myDialog){//Add a dialog column.with(dialogColumns.add()){//Create a text edit field.var myTextEditField = textEditboxes.add({editContents:myFileName + "_r", minWidth:180});}}//Display the dialog box.var myResult = myDialog.show();if(myResult == true){//Get the values from the dialog box controls.var myString = myTextEditField.editContents;//Remove the dialog box from memory.myDialog.destroy();saveAndBackup(myString);}else{myDialog.destroy();}function saveAndBackup(myString) {//DESCRIPTION:Copies the current document to a backup-location before saving// var backup_path = "/someFolder/someSubfolder/backupLocation";var desktop_path = app.activeDocument.filePath.fsName.toString(); var backup_path = desktop_path+"/z_old";if (Folder(backup_path.exists == false )) {	Folder(backup_path).create();	}// if (app.documents.length > 0) {// 	main();// } app.activeDocument.save(new File(desktop_path + "/" + myString));// To Do Delete old file after running this function// function main() {// 	var doc = app.activeDocument;// 	try {// 		if (doc.saved == true) {// 			var doc_file = doc.fullName;// 			var doc_name = doc.name;// 			var now = new Date();// 			var datestamp = two_digit(now.getMonth()+1) + two_digit(now.getDate()) + now.getFullYear().toString().substring(2);// 			var target_folder = Folder(backup_path + "/" + datestamp);// 			if (target_folder.exists == false ) {target_folder.create(); }// 			var target_file = target_folder.toString() + "/_" + doc_name;// 			if (doc_file.copy(target_file) == false) {// 				alert("Backup error\rCould not create backup copy.");// 			}	// 		}// 	} catch (e) {// 		alert(e);// 	}// 	doc.save(); 	// 	function two_digit(n) {// 		if (n < 10) {// 			return "0" + n.toString();// 		} else {// 			return n.toString();// 		}// 	}	// }sendToPDF(myString);function sendToPDF(myString){	var pdfPresetsList = app.pdfExportPresets.everyItem().name;		myFile = desktop_path + "/" + myString + ".pdf";	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.neverInteract; // vremenno otkluchit' soobsheniya	doc.exportFile(ExportFormat.pdfType, myFile, false, "Screen 100");	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll; // vkluchit' opyat'}}