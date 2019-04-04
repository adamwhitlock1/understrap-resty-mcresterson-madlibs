<?php
/**
 * The home template
 *
 *
 * @package understrap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper" id="page-wrapper">
	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">
		<div class="row">

			<!-- Do the left sidebar check -->
			<?php get_template_part( 'global-templates/left-sidebar-check' ); ?>

			<main class="site-main fadeInUp" id="main">

      <div class="row h100vh">
        <div class="col p-4">
          <h2>Let's make a madlib!</h2>

          <div id="start-madlib">
            <p class="lead">
              Start by writing a story that will serve as the madlib base. If you would like us to make a story for you, then click the button below that says "generate a story". When you are ready to mix it up and generate your madlib fields, press the start button.
            </p>

            <div class="row" id="step1-row">
              <div class="col">
                <textarea id="start-content" rows="15" cols="80"></textarea>
              </div>
              <div class="col">
                <button id="gen-story" class="btn btn-warning">Generate a story</button>
                <button id="start" class="btn btn-success">Start</button>
              </div>
            </div>

            <div class="row" id="step2-row">
              <div class="col" id="step2-inputs">

              </div>
              <div class="col">
                <button id="gen-completed-madlib" class="btn btn-danger">See your completed madlib</button>
              </div>
            </div>

            <div class="row" id="step3-row">
              <div class="col" id="step3-content">

              </div>
            </div>

          </div>

        </div>
      </div>

			</main><!-- #main -->

		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #page-wrapper -->

<?php get_footer(); ?>
