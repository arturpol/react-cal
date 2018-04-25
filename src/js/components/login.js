import React from 'react';

class Login extends React.Component {
	
	render(){
		
		return (
			<div class="cell auto">
				<div class="grid-y align-center">
					<div class="cell shrink">
						<div class="grid-x grid-container grid-padding-x">
							<div class="cell text-center">
								<h2><i class="fa fa-sign-in"></i></h2>
								<p class="lead">Sign in to see your calendar.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
		
	}
	
}

export default Login;