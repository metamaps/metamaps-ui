<!--

  Do you want to learn more about web development using Ruby or Javascript?

  Metamaps.cc is an open source project, and we are always looking for new
  developers to help contribute to our codebase! To get involved, send an
  email to team@metamaps.cc or find us on Github at
  https://github.com/metamaps/metamaps.

-->

<!DOCTYPE html>
<html>
<head>
  <title>{ yield(:title) }</title>
  { csrf_meta_tags }
  <meta name="viewport" content="width=device-width, user-scalable=no">
  
  { if controller.className.name == 'MapsController' && @map }
    <meta property="og:title" content="{ @map.name }" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="{ @map.screenshot_url }" />
    <meta property="og:description" content="{ @map.desc }" />
    <meta property="og:url" content="{ request.original_url }" />

    <meta name="twitter:title" content="{ @map.name }" />
    <meta name="twitter:image" content="{ @map.screenshot_url }" />
    <meta name="twitter:description" content="{ @map.desc }" />
    <meta name="twitter:url" content="{ request.original_url }" />
  { end }

  { if controller_name == 'maps' && action_name == "conversation" }
    { stylesheet_link_tag    "application", :media => "all" }
    { stylesheet_link_tag    "application-secret", :media => "all" }
    { javascript_include_tag "application-secret" }
  { else }
    { stylesheet_link_tag    "application", :media => "all" }
    { javascript_include_tag "application" }
  { end }

  <!-- typekit for vinyl font -->
  <script type="text/javascript" src="https://use.typekit.net/tki2nyo.js"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

  <!--[if (IE)]>
    <style type="text/css">
      #lightbox_overlay {
        display: block;
      }

      #lightbox_main {
        top: 50%;
        margin-top: -281px;
      }

      #lightbox_screen {
        height: 100%;
        opacity: 0.42;
      }

      .lightboxContent {
        display: none;
      }

      #noIE {
        display: block;
      }

      #lightbox_close {
        display: none;
      }

    </style>
    <script type="text/javascript">
      $(document).ready(function(){
        $("#lightbox_screen").unbind().click(function(event){
          event.preventDefault();
          event.stopPropagation();
          return false;
        });
      });
    </script>
  <![endif]-->
</head>
