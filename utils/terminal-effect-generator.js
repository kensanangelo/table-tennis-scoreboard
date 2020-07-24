
// Generates the EPIC startup screen in the terminal 
// when starting the server

// Running in production gives a big cool effect
// Running in development gives a smaller effect, since it's being refreshed a lot

module.exports = () => {
	if(process.env.NODE_ENV === 'production') {

		console.log('\u001b[34m', ' \n========================================================\n', '\x1b[0m');
		console.log('\u001b[36;1m', " ____  _        __     ___     _             " , '\x1b[0m');  
		console.log('\u001b[36;1m', "| __ )(_) __ _  \\ \\   / (_)___(_) ___  _ __  " , '\x1b[0m');
		console.log('\u001b[36;1m', "|  _ \\| |/ _` |  \\ \\ / /| / __| |/ _ \\| '_ \\ " , '\x1b[0m');
		console.log('\u001b[36;1m', "| |_) | | (_| |   \\ V / | \\__ \\ | (_) | | | |" , '\x1b[0m');
		console.log('\u001b[36;1m', "|____/|_|\\__, |    \\_/  |_|___/_|\\___/|_| |_|" , '\x1b[0m');
		console.log('\u001b[36;1m', "         |___/                               " , '\x1b[0m');
		
		console.log('\u001b[36;1m', " ____                     _                         _ " , '\x1b[0m');
		console.log('\u001b[36;1m', "/ ___|  ___ ___  _ __ ___| |__   ___   __ _ _ __ __| |" , '\x1b[0m');
		console.log('\u001b[36;1m', "\\___ \\ / __/ _ \\| '__/ _ \\ '_ \\ / _ \\ / _` | '__/ _` |" , '\x1b[0m');  
		console.log('\u001b[36;1m', " ___) | (_| (_) | | |  __/ |_) | (_) | (_| | | | (_| |" , '\x1b[0m');  
		console.log('\u001b[36;1m', "|____/ \\___\\___/|_|  \\___|_.__/ \\___/ \\__,_|_|  \\__,_|" , '\x1b[0m');  

		console.log(`\n  V${process.env.npm_package_version}`);
		console.log('\u001b[34m', ' \n========================================================\n', '\x1b[0m');
	
	}else{
			console.log("\n\x1b[47m\x1b[30m", 'Scoreboard server is running', '\x1b[0m');
			console.log("\x1b[47m\x1b[30m", `V${process.env.npm_package_version}                      `, '\x1b[0m');
	}
}