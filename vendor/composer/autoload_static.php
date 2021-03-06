<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd7ffbec886f48a7f00ab0d549aa30695
{
    public static $files = array (
        '0e6d7bf4a5811bfa5cf40c5ccd6fae6a' => __DIR__ . '/..' . '/symfony/polyfill-mbstring/bootstrap.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Symfony\\Polyfill\\Mbstring\\' => 26,
        ),
        'R' => 
        array (
            'Respect\\Validation\\' => 19,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Symfony\\Polyfill\\Mbstring\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-mbstring',
        ),
        'Respect\\Validation\\' => 
        array (
            0 => __DIR__ . '/..' . '/respect/validation/library',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitd7ffbec886f48a7f00ab0d549aa30695::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitd7ffbec886f48a7f00ab0d549aa30695::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
