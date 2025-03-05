<?php 
function portfolio_register_custom_post_types() {
    // Portfolio Works CPT
    $labels = array(
        'name'                     => _x( 'Works', 'post type general name', 'portfolio-theme' ),
        'singular_name'            => _x( 'Work', 'post type singular name', 'portfolio-theme' ),
        'add_new'                  => _x( 'Add New', 'work', 'portfolio-theme' ),
        'add_new_item'             => __( 'Add New Work', 'portfolio-theme' ),
        'edit_item'                => __( 'Edit Work', 'portfolio-theme' ),
        'new_item'                 => __( 'New Work', 'portfolio-theme' ),
        'view_item'                => __( 'View Work', 'portfolio-theme' ),
        'view_items'               => __( 'View Works', 'portfolio-theme' ),
        'search_items'             => __( 'Search Works', 'portfolio-theme' ),
        'not_found'                => __( 'No works found.', 'portfolio-theme' ),
        'not_found_in_trash'       => __( 'No works found in Trash.', 'portfolio-theme' ),
        'parent_item_colon'        => __( 'Parent Works:', 'portfolio-theme' ),
        'all_items'                => __( 'All Works', 'portfolio-theme' ),
        'archives'                 => __( 'Work Archives', 'portfolio-theme' ),
        'attributes'               => __( 'Work Attributes', 'portfolio-theme' ),
        'insert_into_item'         => __( 'Insert into work', 'portfolio-theme' ),
        'uploaded_to_this_item'    => __( 'Uploaded to this work', 'portfolio-theme' ),
        'featured_image'           => __( 'Work featured image', 'portfolio-theme' ),
        'set_featured_image'       => __( 'Set work featured image', 'portfolio-theme' ),
        'remove_featured_image'    => __( 'Remove work featured image', 'portfolio-theme' ),
        'use_featured_image'       => __( 'Use as featured image', 'portfolio-theme' ),
        'menu_name'                => _x( 'Works', 'admin menu', 'portfolio-theme' ),
        'filter_items_list'        => __( 'Filter works list', 'portfolio-theme' ),
        'items_list_navigation'    => __( 'Works list navigation', 'portfolio-theme' ),
        'items_list'               => __( 'Works list', 'portfolio-theme' ),
        'item_published'           => __( 'Work published.', 'portfolio-theme' ),
        'item_published_privately' => __( 'Work published privately.', 'portfolio-theme' ),
        'item_reverted_to_draft'  => __( 'Work reverted to draft.', 'portfolio-theme' ),
        'item_trashed'             => __( 'Work trashed.', 'portfolio-theme' ),
        'item_scheduled'           => __( 'Work scheduled.', 'portfolio-theme' ),
        'item_updated'             => __( 'Work updated.', 'portfolio-theme' ),
        'item_link'                => __( 'Work link.', 'portfolio-theme' ),
        'item_link_description'    => __( 'A link to a work.', 'portfolio-theme' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_nav_menus'  => true,
        'show_in_admin_bar'  => true,
        'show_in_rest'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'works' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-archive',
        'supports'           => array( 'title', 'editor', 'thumbnail' ),
    );
    register_post_type( 'portfolio-work', $args );

}
add_action( 'init', 'portfolio_register_custom_post_types' );


function portfolio_register_taxonomies() {
    // Portfolio Tools taxonomy
    $labels = array(
        'name'                  => _x( 'Tools', 'taxonomy general name', 'portfolio-theme' ),
        'singular_name'         => _x( 'Tool Category', 'taxonomy singular name', 'portfolio-theme' ),
        'search_items'          => __( 'Search Tool Categories', 'portfolio-theme' ),
        'all_items'             => __( 'All Tool Category', 'portfolio-theme' ),
        'parent_item'           => __( 'Parent Tool Category', 'portfolio-theme' ),
        'parent_item_colon'     => __( 'Parent Tool Category:', 'portfolio-theme' ),
        'edit_item'             => __( 'Edit Tool Category', 'portfolio-theme' ),
        'view_item'             => __( 'View Tool Category', 'portfolio-theme' ),
        'update_item'           => __( 'Update Tool Category', 'portfolio-theme' ),
        'add_new_item'          => __( 'Add New Tool Category', 'portfolio-theme' ),
        'new_item_name'         => __( 'New Tool Category Name', 'portfolio-theme' ),
        'template_name'         => __( 'Tool Category Archives', 'portfolio-theme' ),
        'menu_name'             => __( 'Tool Category', 'portfolio-theme' ),
        'not_found'             => __( 'No tool categories found.', 'portfolio-theme' ),
        'no_terms'              => __( 'No tool categories', 'portfolio-theme' ),
        'items_list_navigation' => __( 'Tool Categories list navigation', 'portfolio-theme' ),
        'items_list'            => __( 'Tool Categories list', 'portfolio-theme' ),
        'item_link'             => __( 'Tool Category Link', 'portfolio-theme' ),
        'item_link_description' => __( 'A link to a tool category.', 'portfolio-theme' ),
    );
    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'show_in_nav_menu'  => true,
        'show_in_rest'      => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'tool-categories' ),
    );
    register_taxonomy( 'portfolio-tool-category', array( 'portfolio-work' ), $args );

}


add_action( 'init', 'portfolio_register_taxonomies' );


function portfolio_rewrite_flush() {
    portfolio_register_custom_post_types();
    portfolio_register_taxonomies();
    flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'portfolio_rewrite_flush' );

if ( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title' => 'Global Settings',
        'menu_title' => 'Global Settings',
        'menu_slug'  => 'global-settings',
        'capability' => 'edit_posts',
        'redirect'   => false
    ));
}

