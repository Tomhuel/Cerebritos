<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\DeleteAccount;
use App\Http\Controllers\Auth\GoogleAuth;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use App\Http\Controllers\Auth\Register;
use App\Http\Controllers\Club\GetClubController;
use App\Http\Controllers\User\GetUserRole;
use App\Http\Controllers\User\SetUserRole;
use App\Http\Controllers\Achievements\CreateAchievement;
use App\Http\Controllers\Achievements\DeleteAchievement;
use App\Http\Controllers\Achievements\GenerateCode;
use App\Http\Controllers\Achievements\GetAchievements;
use App\Http\Controllers\Achievements\UpdateAchievement;
use App\Http\Controllers\Achievements\RedeemCode;
use App\Http\Controllers\Logs\GetLogs;
use App\Http\Controllers\User\UpdateAge;
use App\Http\Controllers\User\UpdateUser;
use App\Http\Controllers\Family\AddKid;
use App\Http\Controllers\Family\DeleteKid;
use App\Http\Controllers\Family\GetKids;
use App\Http\Controllers\Product\CreateProduct;
use App\Http\Controllers\Product\DeleteProduct;
use App\Http\Controllers\Order\DiscardOrder;
use App\Http\Controllers\Order\GetOrders;
use App\Http\Controllers\Product\GetProducts;
use App\Http\Controllers\Product\ReserveProduct;
use App\Http\Controllers\Product\UpdateProduct;
use App\Http\Controllers\User\GetProfiles;
use App\Http\Controllers\User\GetUser;
use App\Http\Controllers\User\KidAchievements;
use App\Http\Controllers\Achievements\MyAchievements;
use App\Http\Controllers\Role\GetRoles;

Route::group(['middleware' => ['web', 'cors']], function () {

    // * Auth's Group * //
    Route::middleware([])->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post("/register", [Register::class, 'register']);
            Route::post("/login", [Login::class, 'login']);
            Route::middleware("auth:api")->post("/logout", [Logout::class, 'logout']);
        });
    });

    // * Google Auth's Group * //
    Route::get('/google-auth/redirect', [GoogleAuth::class, 'redirect']);
    Route::get('/google-auth/callback', [GoogleAuth::class, 'callback']);

    // * User's Group * //
    Route::prefix('user')->group(function () {
        Route::group(['middleware' => ['auth:api']], function () {
            Route::get('/role', [GetUserRole::class, 'getUserRole']);
            Route::post("/update", [UpdateUser::class, 'updateUser']);
            Route::delete("/delete", [DeleteAccount::class, 'deleteAccount']);
            Route::middleware('admin')->post('/role/set', [SetUserRole::class, 'setUserRole']);
            Route::get('/me', [GetUser::class, 'getUser']);
        });
        Route::get('/all', [GetUser::class, 'getUsers']);
        Route::get('/kid-achievements/{id}', [KidAchievements::class, 'kidAchievements']);
        Route::get('/kids-profiles', [GetProfiles::class, 'getProfiles']);
        Route::get('/kids-profiles/{id}', [GetProfiles::class, 'getProfile']);
    });

    // * Family's Group * //
    Route::prefix('family')->group(function () {
        Route::group(['middleware' => ['auth:api']], function () {
            Route::post('/add-kid', [AddKid::class, 'addKid']);
            Route::get('/kids', [GetKids::class, 'getKids']);
            Route::delete('/delete-kid/{id}', [DeleteKid::class, 'deleteKid']);
        });
    });

    // * Achievements's Group * //
    Route::prefix('achievement')->group(function () {
        Route::middleware(['auth:api'])->group(function () {
            Route::get('/own', [MyAchievements::class, 'myAchievements']);
            Route::post('/redeem-code', [RedeemCode::class, 'redeemCode']);
            Route::middleware(['admin-monitor'])->group(function () {
                Route::post('/generate-code', [GenerateCode::class, 'GenerateCode']);
                Route::middleware(['admin'])->group(function () {
                    Route::post('/new', [CreateAchievement::class, 'CreateAchievement']);
                    Route::post('/update/{id}', [UpdateAchievement::class, 'UpdateAchievement']);
                    Route::delete('/delete/{id}', [DeleteAchievement::class, 'DeleteAchievement']);
                });
            });
        });
        Route::get('/all', [GetAchievements::class, 'GetAchievements']);
        Route::get('/{id}', [GetAchievements::class, 'GetAchievement']);
    });

    // * Clubs's Group * //
    Route::prefix('club')->group(function () {
        Route::get('/all', [GetClubController::class, 'getAllClubs']);
        Route::get('/{id}', [GetClubController::class, 'getClub']);
        Route::middleware(['auth:api'])->group(function () {
            Route::middleware(['admin-monitor'])->group(function () {
                Route::post('/new', []);
                Route::delete('/delete', []);
                Route::put('/update', []);
            });
        });
    });

    // * Product's Group * //
    Route::prefix('product')->group(function () {
        Route::get('/all', [GetProducts::class, 'getProducts']);
        Route::get('/{id}', [GetProducts::class, 'getProduct']);
        Route::middleware(['auth:api'])->group(function () {
            Route::put('/reserve-product/{id}', [ReserveProduct::class, 'reserveProduct']);
            Route::middleware(['admin'])->group(function () {
                Route::post('/new', [CreateProduct::class, 'createProduct']);
                Route::delete('/delete/{id}', [DeleteProduct::class, 'deleteProduct']);
                Route::post('/update/{id}', [UpdateProduct::class, 'updateProduct']);
            });
        });
    });

    // * Order's Group * //
    Route::prefix('order')->group(function () {
        Route::middleware(['auth:api','admin'])->group(function () {
            Route::get('/all', [GetOrders::class, 'getOrders']);
            Route::put('/discard-order/{id}', [DiscardOrder::class, 'discardOrder']);
        });
    });

    // * All Roles Endpoint * //
    Route::middleware(['admin-monitor', 'auth:api'])->get('/roles', [GetRoles::class, 'getRoles']);

    // * Logging's Group * //
    Route::middleware(['auth:api', 'admin'])->get('/logs', [GetLogs::class, 'getLogs']);
});
